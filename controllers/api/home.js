const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Form = require("../../models/form");

function home(req, res) {
  // req.user will always be there for you when a token is sent
  console.log("req.user", req.user);

  const form = Form.findOne({ user: req.user._id });
  console.log(form, "--------------");
  // if user is logged in
  // get submission

  res.send(form);
}

module.exports = {
  home,
};
