import type { APIRoute } from "astro";
import { WebflowClient } from "webflow-api";
import getWebflowSdk from "../utils/getWebflowSdk";

export const GET: APIRoute = async ({ cookies, request }) => {
  const wf = getWebflowSdk(cookies);
  if (!wf) {
    return Response.error();
  }
  const sites = await wf.sites.list();
  if (sites && sites.sites?.length) {
    const firstSite = sites.sites[0];
    const pages = await wf.pages.list(firstSite.id);
    if (pages.pages?.length) {
      return new Response(
        JSON.stringify({
          pages: pages.pages,
        })
      );
    }
  }
  return Response.error();
};
