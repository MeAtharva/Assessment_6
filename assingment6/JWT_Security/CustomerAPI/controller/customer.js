const customer = require("../data/Customer.json");
const jwt = require("jsonwebtoken");
const fs = require("fs");
var express = require("express");
const app = express();
app.use(express.json());
const blogic = require("../factory/blogic");
const authlogic = require("../factory/authlogic");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const jsonlogic = require("../factory/jsonlogic");

//To get all data of user
exports.get_all = async (req, res) => {
  const token = req.token;
  try {
    const r = await authlogic.verifyjwt1(token);
    res.send(r);
  } catch (err) {
    res.status(403).send("Error");
  }
};

//To get data of user by name
exports.get_one = async (req, res) => {
  const name = req.params.firstName;
  const token = req.token;
  try {
    const r = await authlogic.verifyjwt(token, name);
    res.send(r);
  } catch (err) {
    res.status(403).send("No costomer with given name ");
  }
};

//To create token
exports.create_token = async (req, res) => {
  const cust = jsonlogic.findusername(req.body.username);
  const cust1 = jsonlogic.findpassword(req.body.password);
  const password = req.body.password;
  try {
    const token = await authlogic.createToken(cust, cust1, password);
    res.json({ token });
  } catch (err) {
    res.status(403).send("Wrong Username and Password !");
  }
};

//To register user
exports.register_user = (req, res) => {
  const data = req.body;
  const r = blogic.registerUser(data);
  res.send(r);
};
