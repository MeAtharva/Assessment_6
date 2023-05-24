const fs = require("fs");
const jsonlogic = require("../factory/jsonlogic");

exports.jsonlogic = () => {
  var jsondata = fs.readFileSync("./Userdata/userdata.json");
  jsondata = JSON.parse(jsondata);
  return jsondata;
};

exports.findusername = (data) => {
  const jsondata = jsonlogic.jsonlogic();
  const cust = jsondata.find((c) => c.username == data);
  return cust;
};

exports.findpassword = (data) => {
  const jsondata = jsonlogic.jsonlogic();
  const cust1 = jsondata.find((c) => c.password == data);
  return cust1;
};
