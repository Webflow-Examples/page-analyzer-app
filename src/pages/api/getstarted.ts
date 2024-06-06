import type { APIRoute } from "astro";
import { WebflowClient } from "webflow-api";

export const GET: APIRoute = async () => {
  const authorizeUrl = WebflowClient.authorizeURL({
    scope: [
      "cms:read",
      "cms:write",
      "pages:read",
      "pages:write",
      "sites:read",
      "sites:write",
    ],
    clientId: import.meta.env.WEBFLOW_CLIENT_ID || "",
  });
  return Response.redirect(authorizeUrl);
};
