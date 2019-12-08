

function fetch_goods() {
  return fetch('https://vnhz14y4a8.execute-api.ap-northeast-2.amazonaws.com/prod/stock', {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Content-type": "application/json; charset=UTF-8"
    },
  })
  .then(res => {
    return res.json();
  });
}

module.exports = {
  fetch_goods
};
