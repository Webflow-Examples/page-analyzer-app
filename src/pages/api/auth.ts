import type { APIRoute } from "astro";
import { WebflowClient } from "webflow-api";
import { storeToken } from "../utils/tokens";

/**
 * This is the Webflow Redirect URI that should be configured for the Webflow
 * App. When the user authorizes the App for the Webflow Site(s), Webflow will
 * redirect the user to this endpoint with an Authorization code.
 *
 * This endpoint will then take the code and other App details to get an
 * access token from Webflow (via the SDK). Once we successfully have the
 * token, we will store it in the database.
 *
 * Finally, the endpoint will redirect the user to a success "landing" page
 * where they can start using various features of this App
 *
 * @param { url } - URL of our Data Client
 */
export const GET: APIRoute = async ({ url }) => {
  const { searchParams } = url;
  const reqUrl = new URL(url);
  const accessToken = await WebflowClient.getAccessToken({
    clientId: import.meta.env.WEBFLOW_CLIENT_ID || "",
    clientSecret: import.meta.env.WEBFLOW_CLIENT_SECRET || "",
    code: searchParams.get("code") || "",
  });
  await storeToken("user", accessToken);
  return Response.redirect(`${reqUrl.origin}/success`);
};
