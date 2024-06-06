import type { APIRoute } from "astro";
import { WebflowClient } from "webflow-api";

export const GET: APIRoute = async ({ url, cookies }) => {
  const { searchParams } = url;
  const reqUrl = new URL(url);
  const accessToken = await WebflowClient.getAccessToken({
    clientId: import.meta.env.WEBFLOW_CLIENT_ID || "",
    clientSecret: import.meta.env.WEBFLOW_CLIENT_SECRET || "",
    code: searchParams.get("code") || "",
  });
  cookies.set("wf_token", accessToken, { path: "/", sameSite: true });
  return Response.redirect(`${reqUrl.origin}/success`);
};
