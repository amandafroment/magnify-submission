const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Form = require("../../models/form");

async function getSubmissions(req, res) {
  // req.user will always be there for you when a token is sent
  if (!req.user) {
    return res.json({});
  }

  let submissions = [];

  if (req.user.is_hr) {
    submissions = await Form.find({});
  } else {
    submissions = await Form.find({ user: req.user._id });
  }
  res.json(submissions);
}

module.exports = {
  getSubmissions,
};
