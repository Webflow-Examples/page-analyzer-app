import { WebflowClient } from "webflow-api";

export default function (cookies) {
  const wfToken = cookies.get("wf_token")?.value;
  if (!wfToken) {
    console.error("No Webflow Access Token found. Try re-authorizing");
    return;
  }
  return new WebflowClient({
    accessToken: wfToken,
  });
}
