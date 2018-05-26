import $ from './easyFetch';


export default {
  signIn(userMessage) {
    return $.post("/api/auth/login", userMessage);
  },

  signUp(userMessage) {
    return $.post("/api/auth/register", userMessage);
  },

  getUserInfo() {
    return $.get(("/api/auth/me"));
  }
}
