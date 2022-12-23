import sendRequest from "./send-request";

export function getHomeData() {
  return sendRequest(`/submission`);
}
