import type { APIRoute } from "astro";
import getWebflowSdk from "../utils/getWebflowSdk";

export const GET: APIRoute = async () => {
  const wf = await getWebflowSdk();
  if (!wf) {
    return Response.error();
  }
  const sites = await wf.sites.list();
  if (sites && sites.sites?.length) {
    return new Response(
      JSON.stringify({
        sites: sites.sites,
      })
    );
  }
  return Response.error();
};
