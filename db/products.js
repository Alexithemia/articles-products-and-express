const products = {
  productList: []
};
const prod = products.productList;
let idCount = 0;

function find(id) {
  let found = false;
  prod.forEach(product => {
    if (product.id === id) {
      found = product;
    }
  });
  return found;
}

function add(data) {
  data.id = idCount.toString();
  prod.push(data);
  return idCount++;
};

function remove(id) {
  let found = false;
  prod.forEach(product => {
    if (product.id === id) {
      prod.splice(prod.indexOf(product), 1);
      found = true;
    }
  });
  return found;
}

function change(data, id) {
  let found = false;
  prod.forEach(product => {
    if (product.id === id) {
      for (const key in data) {
        if (key) {
          product[key] = data[key];
        }
      }
      found = true;
    }
  });
  return found;
}

module.exports = {
  find,
  add,
  remove,
  change,
  products
}