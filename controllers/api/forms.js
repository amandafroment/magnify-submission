const Form = require("../../models/form");
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" }).single("file");
async function createForm(req, res) {
  upload(req, res, async (err) => {
    if (!err) {
      const file = req.file;
      console.log("-------- bar");
      console.log(file);
      console.log("--------");

      body = JSON.parse(JSON.stringify(req.body));
      body.user = req.user._id;
      // body.file = req.user._id;
      const form = await Form.create(body);
      res.setHeader("Content-Type", "application/json");
      res.json(form);
    }

    res.statusMessage = "Could not save submission";
    res.status(400).end();
  });
}

module.exports = {
  createForm,
};
