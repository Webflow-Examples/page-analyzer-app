import type { APIRoute } from "astro";
import textgears from "textgears-api";
import getWebflowSdk from "../utils/getWebflowSdk";

export const POST: APIRoute = async ({ cookies, request }) => {
  // Get the Webflow SDK Client from middleware
  const wf = getWebflowSdk(cookies);
  if (!wf) {
    return Response.error();
  }

  // Instantiate the Textgears SDK to call Textgears APIs for readability score
  const textgearsApi = textgears(import.meta.env.TEXTGEARS_API_KEY, {
    language: "en-US",
  });

  // Get the user-selected Webflow Page ID
  const formData = await request.json();
  let pageId = formData.pageId as string;

  // Call the Get Page Content API
  const pageContent = await wf.pages.getContent(pageId);

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

  // Call the Textgears Readability API and feed it the page content
  // to get a Flesh-Kincaid Test score
  const analyzedText = await textgearsApi.checkReadability(allPageText);

  // Pass data back to the frontend
  if (analyzedText) {
    return new Response(JSON.stringify(analyzedText));
  }
  return Response.error();
};
