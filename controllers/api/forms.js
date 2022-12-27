const Form = require("../../models/form");
// const multer = require("multer");
// const upload = multer({ dest: "public/uploads/" }).single("file");
var multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage }).single("file");
var fs = require("fs");
var path = require("path");
require("dotenv/config");

async function createForm(req, res) {
  upload(req, res, async (err) => {
    if (!err) {
      body = JSON.parse(JSON.stringify(req.body));
      console.log(req.file);
      body.user = req.user._id;
      if (req.file) {
        body.fileName = req.file.originalname;
        body.file = {
          data: fs.readFileSync(
            path.join(__dirname + "/../../public/uploads/" + req.file.filename)
          ),
          contentType: "application/pdf",
        };
      }
      // body.file = req.user._id;
      const form = await Form.create(body);
      res.setHeader("Content-Type", "application/json");
      return res.json(form);
    }
    console.log("--------");
    console.log(err);
    console.log("--------");

    res.statusMessage = "Could not save submission";
    res.status(400).end();
  });
}

module.exports = {
  createForm,
};
