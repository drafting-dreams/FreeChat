export default {
  get: function (url) {
    return fetch(url)
      .then(res => res.json());
  },
  post: function (url, body) {
    return fetch(url,
      {
        body: JSON.stringify(body),
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        }
      }
    )
      .then(res => {
        return res.json();
      })

  }
}
