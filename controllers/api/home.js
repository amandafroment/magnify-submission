const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Form = require("../../models/form");

function home(req, res) {
  const form = null;
  // req.user will always be there for you when a token is sent
  console.log("req.user", req.user);
  if (!req.user) {
    return res.json({});
  }

  Form.findOne({ user: req.user._id }, (err, form) => {
    if (err) {
      return res.json({});
    }

    console.log(form, "--------------");
    res.json(form);
  });
}

module.exports = {
  home,
};
