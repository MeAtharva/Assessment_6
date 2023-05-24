const express = require("express");
const jwt = require("jsonwebtoken");
const customer = require("../data/Customer.json");
const fs = require("fs");
const res = require("express/lib/response");
const { resolve } = require("path");
const app = express();
app.use(express.json());

const jsonlogic = () => {
  var jsondata = fs.readFileSync("./Userdata/userdata.json");
  jsondata = JSON.parse(jsondata);
  return jsondata;
};

//Logic to create token
const createToken = (cust, cust1, password) => {
  return new Promise((resolve, reject) => {
    const jsondata = jsonlogic();
    if (cust && cust1 != undefined) {
      jwt.sign({ password }, "secretkey", (err, token) => {
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
const verifyjwt = (token, name) => {
  return new Promise((resolve, reject) => {
    const cust = customer.find((c) => c.firstName == name);
    jwt.verify(token, "secretkey", (err, customer) => {
      if (err) {
        reject(err);
      } else {
        if (!cust) {
          reject(err);
        }
        resolve(cust);
      }
    });
  });
};

//Logicc returning all data after verifying
const verifyjwt1 = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, "secretkey", (err, customer) => {
      if (err) {
        reject(err);
      } else {
        resolve(customer);
      }
    });
  });
};

module.exports = {
  createToken: createToken,
  verifyjwt,
  verifyjwt1,
};
