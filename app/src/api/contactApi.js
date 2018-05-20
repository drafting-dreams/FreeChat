import $ from "./easyFetch";

function findUserByEmail(email) {
  return $.get(`/api/contact/find/${email}`);
}

export default {findUserByEmail}
