import $ from "./easyFetch";

function findUserByEmail(email) {
  return $.get(`/api/contact/find/${email}`);
}

function addContact(email) {
  return $.get(`/api/contact/addContact/${email}`);
}


function getContact() {
  return $.get("/api/contact/getContacts");

}

export default {findUserByEmail, addContact, getContact}
