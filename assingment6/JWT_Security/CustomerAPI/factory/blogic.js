const { json } = require("body-parser");
const express = require("express");
const jwt = require("jsonwebtoken");
const customer = require("../data/Customer.json");
const fs = require("fs");
const res = require("express/lib/response");
const app = express();
app.use(express.json());
const jsonlogic = require("../factory/jsonlogic");

//Logic to register user in database
exports.registerUser = (data) => {
  if ("username" in data && "password" in data) {
    const jsondata = jsonlogic.jsonlogic();
    const cust = jsondata.find((c) => c.username == data.username);
    const cust1 = jsondata.find((p) => p.password == data.password);
    if (cust || cust1 != undefined) {
      return "Username or Password Alerady Exist !";
    } else {
      jsondata.push(data);
      fs.writeFileSync(
        "./Userdata/userdata.json",
        JSON.stringify(jsondata, null, 1)
      );
      return "You Have Register Successfully!";
    }
  } else {
    return "Please check the spelling of username and password";
  }
};
