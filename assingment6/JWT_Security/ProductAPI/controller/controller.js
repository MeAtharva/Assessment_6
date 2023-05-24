const jwt = require("jsonwebtoken");
const fs = require("fs");
const blogic = require("../factory/registerlogic");
const jsonlogic = require("../factory/jsonlogic");
const authlogic = require("../factory/authlogic");
const Productdata = require("../Productdata/product.json");
const edde = require("../factory/edit_delete");
const adddata = require("../factory/adddata");

//Controller to create token
exports.create_token = async (req, res) => {
  const cust = jsonlogic.findusername(req.body.username);
  const cust1 = jsonlogic.findpassword(req.body.password);
  const username = req.body.username;
  try {
    const token = await authlogic.createToken(cust, cust1, username);
    res.json({ token });
  } catch (err) {
    res.status(403).send("Wrong Username and Password !");
  }
};

//Controller to get all data
exports.get_all = (req, res) => {
  const jsondata = jsonlogic.productdata();
  jwt.verify(req.token, "secretkey", (err, products) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.send(jsondata);
    }
  });
};

//Controller to add data
exports.add_data = (req, res) => {
  const r = adddata.adddata(req.body, req.token);
  res.send(r);
};

//Controller to edit data
exports.update_data = (req, res) => {
  var udata = jwt.decode(req.token);
  if (udata.username == "Moti") {
    const jsondata = jsonlogic.productdata();
    const r = edde.editdata(req.token, req.body, req.params.id, jsondata);
    res.send(r);
  } else {
    res.send("Sorry only admin can update data");
  }
};

//Controller to delete data
exports.delete_data = (req, res) => {
  var udata = jwt.decode(req.token);
  if (udata.username == "Moti") {
    const jsondata = jsonlogic.productdata();
    const r = edde.deletedata(req.token, jsondata, req.params.id);
    res.send(r);
  } else {
    res.send("Sorry only admin can update data");
  }
};

//Controller to register user
exports.register_user = (req, res) => {
  const data = req.body;
  const r = blogic.registerUser(data);
  res.send(r);
};

//Controller get data by id
exports.get_one = async (req, res) => {
  const id = req.params.id;
  const token = req.token;
  try {
    const r = await authlogic.verifyjwt(token, id);
    res.send(r);
  } catch (err) {
    res.status(403).send("No product with given id ");
  }
};
