import type { APIRoute } from "astro";
import getWebflowSdk from "../utils/getWebflowSdk";

export const GET: APIRoute = async () => {
  const wf = await getWebflowSdk();
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
