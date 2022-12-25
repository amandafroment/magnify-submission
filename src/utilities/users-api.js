import sendRequest from "./send-request";
const BASE_URL = "/api/users";

export async function signUp(userData) {
  return sendRequest(BASE_URL, "POST", JSON.stringify(userData));
}

export async function login(userData) {
  return sendRequest(`${BASE_URL}/login`, "POST", JSON.stringify(userData));
}

export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}

// we dont need to send anything up to the server because its a get request
// to check the token we dont need to pass a payload up to the server
