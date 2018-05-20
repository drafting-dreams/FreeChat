const store = {};

function set(userId, ws) {
  store[userId] = ws;
}

function get(userId) {
  return store[userId];
}

module.exports = {set, get};