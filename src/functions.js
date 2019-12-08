const API_URL = 'https://vnhz14y4a8.execute-api.ap-northeast-2.amazonaws.com/prod/';

function fetch_goods() {
  return fetch(API_URL + 'stock', {
    method: "GET",
  })
  .then(res => {
    return res.json();
  });
}

function fetch_customers() {
  return fetch(API_URL + 'customer', {
    method: "GET",
  })
  .then(res => {
    return res.json();
  });
}

function add_customers(id, name, age) {
  return fetch(API_URL + 'customer', {
    method: "PUT",
    body: JSON.stringify({
      id,
      name,
      age
    }),
    json: true,
  })
  .then(res => {
    return res.json();
  });
}

function detect_user(id) {
  return fetch(API_URL + 'customer/detect', {
    method: "POST",
    body: JSON.stringify({
      id,
    }),
    json: true,
  })
  .then(res => {
    return res.json();
  });
}

function anti_theft(id, goods) {
  return fetch(API_URL + 'anti-theft', {
    method: "POST",
    body: JSON.stringify({
      customerID: id,
      goods,
    }),
    json: true,
  })
  .then(res => {
    return res.json();
  });
}

function make_trade(customerID, cart, gross) {
  return fetch(API_URL + 'account', {
    method: "POST",
    body: JSON.stringify({
      customerID,
      cart,
      gross,
    }),
    json: true,
  })
  .then(res => {
    return res.json();
  });
}

function remove_stock(cart) {
  return fetch(API_URL + 'stock/reduce', {
    method: "POST",
    body: JSON.stringify({
      cart,
    }),
    json: true,
  })
  .then(res => {
    return res.json();
  });
}

module.exports = {
  fetch_goods,
  fetch_customers,
  add_customers,
  detect_user,
  anti_theft,
  make_trade,
  remove_stock,
};
