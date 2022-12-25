import sendRequest from "./send-request";

const BASE_URL = "/api/forms";

export function createForm(formData) {
  return sendRequest(`${BASE_URL}/create`, "POST", formData, {});
}
