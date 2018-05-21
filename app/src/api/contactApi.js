import $ from "./easyFetch";

function findUserByEmail(email) {
  return $.get(`/api/contact/find/${email}`);
}

function addContact(email) {
  return $.get(`/api/contact/addContact/${email}`);
}

export default {findUserByEmail, addContact}
