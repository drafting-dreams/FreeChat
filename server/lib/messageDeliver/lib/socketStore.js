const store = {};

function set(userId, ws) {
  console.log(userId + ' socket stored');
  store[userId] = ws;
}

function get(userId) {
  return store[userId];
}

module.exports = {set, get};