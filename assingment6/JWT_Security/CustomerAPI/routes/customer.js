const express = require("express");
const router = express.Router();
const customer = require("../data/Customer.json");
const jwt = require("jsonwebtoken");
const verifyToken = require("../auth/authentication.js");
const { request } = require("express");
const customercontroller = require("../controller/customer");

//To get all customer data to authorized user
router.get("/", verifyToken, customercontroller.get_all);

//Generating Token
router.post("/token", customercontroller.create_token);

//Register user
router.post("/register", customercontroller.register_user);

//To get customer data by name to authorized user
router.get("/:firstName", verifyToken, customercontroller.get_one);

module.exports = router;
