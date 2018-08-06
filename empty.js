const request = require('request');

request({
  url: "http://192.168.38.13:3000/test",
  method: "POST",
  form: {
    "locationId": "123",
    "patentId": "00000-000-00000"
  },
  headers: {
    "authorization": "Bearer token_example",
    "content-type": "application/json"
  }
}, function (err, res, body) {
  if (err) {
    console.error(err);
  } else {
    console.log(body);
  }
});
