const Form = require("../../models/form");

async function createForm(req, res) {
  req.body.user = req.user._id;
  const form = await Form.create(req.body);
  res.json(form);
}

module.exports = {
  createForm,
};
