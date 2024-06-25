import { WebflowClient } from "webflow-api";
import { getToken } from "./tokens";

/**
 * Return a WebflowClient to various API endpoints that need it to call
 * Webflow Data APIs
 *
 * @returns WebflowClient
 */
export default async function () {
  // Grab a stored access token for the user from our DB
  const wfToken = await getToken("user");
  if (!wfToken) {
    console.error("No Webflow Access Token found. Try re-authorizing");
    return;
  }
  return new WebflowClient({
    accessToken: wfToken,
  });
}
