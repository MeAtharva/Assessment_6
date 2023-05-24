const Joi = require("joi");
const express = require("express");
const router = express.Router();
const verifyToken = require("../auth/authentication.js");
const productcontroller = require("../controller/controller");
const fs = require("fs");

// const app = express();
router.use(express.json());

//To register user
router.post("/register", productcontroller.register_user);

//Generating Token
router.post("/token", productcontroller.create_token);

//To get all data
router.get("/", verifyToken, productcontroller.get_all);

//To get particular data by id
router.get("/:id", verifyToken, productcontroller.get_one);

//To add new data to json file
router.post("/", verifyToken, productcontroller.add_data);

//To update data in json file
router.patch("/:id", verifyToken, productcontroller.update_data);

//To delete data from json file but you need to enter password currently
router.delete("/:id", verifyToken, productcontroller.delete_data);

//Exporting Routes
module.exports = router;
