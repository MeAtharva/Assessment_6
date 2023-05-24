const product = require("../Productdata/product.json");
const jwt = require("jsonwebtoken");
const Productdata = require("./jsonlogic");

//Logic to create token
const createToken = (cust, cust1, username) => {
  return new Promise((resolve, reject) => {
    if (cust && cust1 != undefined) {
      jwt.sign({ username }, "secretkey", (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    } else {
      reject(err);
    }
  });
};

//Logic returning data of person after verifying
const verifyjwt = (token, id) => {
  return new Promise((resolve, reject) => {
    const product = Productdata.productdata();
    const prod = product.find((c) => c.id == id);
    jwt.verify(token, "secretkey", (err, product) => {
      if (err) {
        reject(err);
      } else {
        if (!prod) {
          reject(err);
        }
        resolve(prod);
      }
    });
  });
};

module.exports = {
  createToken: createToken,
  verifyjwt,
};
