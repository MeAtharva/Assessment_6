const jwt = require("jsonwebtoken");
const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.json());
const jsonlogic = require("../factory/jsonlogic");

//Logic to add data
exports.adddata = (data, token) => {
  var r = "";
  const jsondata = jsonlogic.productdata();
  const product = {
    id: jsondata.length + 1,
    productName: data.productName,
    price: data.price,
  };

  jwt.verify(token, "secretkey", (err, customer) => {
    if (err) {
      r = "Access forbiden";
    } else {
      jsondata.push(product);

      fs.writeFileSync(
        "./Productdata/product.json",
        JSON.stringify(jsondata, null, 1)
      );
      r = product;
    }
  });
  return product;
};
