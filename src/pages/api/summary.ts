import type { APIRoute } from "astro";
import Groq from "groq-sdk";
import getWebflowSdk from "../utils/getWebflowSdk";

export const POST: APIRoute = async ({ request }) => {
  // Get the Webflow SDK Client from middleware
  const wf = await getWebflowSdk();
  if (!wf) {
    return Response.error();
  }

  // Instantiate the Groq SDK to call Groq APIs for summarization
  const groq = new Groq({
    apiKey: import.meta.env.GROQ_API_KEY,
  });

  // Get the user-selected Webflow Page ID
  const formData = await request.json();
  let pageId = formData.pageId;

  // Call the Get Page Content API
  const pageContent = await wf.pages.getContent(pageId as string);

  // Hack that could be more clever in practice. Concatenate all text on the
  // page by parsing the response from the Get Page Content API
  const allPageText = pageContent.nodes.reduce((acc, val) => {
    if (val.type === "text") {
      if (acc === "") {
        acc += val.text.text;
      } else if (acc.charAt(acc.length - 1) === ".") {
        acc += `\n${val.text.text}`;
      } else {
        acc += `.\n${val.text.text}`;
      }
    }
    return acc;
  }, "");

  // Call the Groq Chat Completions API and feed it the page content
  // while telling the system to summarize the page content at the
  // 2nd-grader level
  const summarizedText = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You must summarize the following content to a 2nd grader",
      },
      {
        role: "user",
        content: allPageText,
      },
    ],
    model: "llama3-8b-8192",
  });

  // Pass data back to the frontend
  if (summarizedText) {
    return new Response(JSON.stringify(summarizedText));
  }
  return Response.error();
};
