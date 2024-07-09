import type { APIRoute } from "astro";
import getWebflowSdk from "../utils/getWebflowSdk";

export const GET: APIRoute = async ({ request }) => {
  const wf = await getWebflowSdk();
  if (!wf) {
    return Response.error();
  }
  const url = new URL(request.url);

  // Extract query parameters
  const queryParams = Object.fromEntries(url.searchParams.entries());
  const siteId = queryParams["siteId"];
  if (siteId) {
    const site = await wf.sites.get(siteId);
    if (site) {
      const pages = await wf.pages.list(site.id);
      if (pages.pages?.length) {
        return new Response(
          JSON.stringify({
            pages: pages.pages,
          })
        );
      }
    }
  }
  return Response.error();
};
