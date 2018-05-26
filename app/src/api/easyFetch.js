import $ from "jquery";

export default {
  get: function (url) {
    return $.get(url);
  },
  post: function (url, body) {
    return $.post(url, body);
  }
}
