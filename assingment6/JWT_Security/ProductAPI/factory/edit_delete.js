const jwt = require("jsonwebtoken");
const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.json());
const jsonlogic = require("../factory/jsonlogic");

//Logic to edit data
const editdata = (token, data, id, jsondata) => {
  var r = "";
  jwt.verify(token, "secretkey", (err) => {
    var prod = jsondata.find((v) => v.id == parseInt(id));
    if (err) {
      return "You don't have access to update this data";
    } else {
      if (!prod) {
        r = "product not found";
      } else {
        prod.id = parseInt(id);
        prod.productName = data.productName;
        prod.price = data.price;
        fs.writeFileSync(
          "./Productdata/product.json",
          JSON.stringify(jsondata, null, 1)
        );
        r = prod;
      }
    }
  });
  return r;
};

//Logic to delete data
const deletedata = (token, jsondata, id) => {
  const productdata = jsonlogic.productdata();
  var r = "";
  jwt.verify(token, "secretkey", (err, productdata) => {
    const prod = jsondata.find((c) => c.id == parseInt(id));
    if (!prod) {
      r = "There is not product available of given id to delete";
    } else {
      var index = prod.id - 1;
      if (err) {
        return "You don't have access to delete this data";
      } else {
        delete jsondata[index];
        fs.writeFileSync(
          "./Productdata/product.json",
          JSON.stringify(jsondata, null, 1)
        );
        r = prod;
      }
    }
  });
  return r;
};

module.exports = {
  editdata: editdata,
  deletedata,
};
