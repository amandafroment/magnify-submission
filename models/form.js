const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formSchema = new Schema({
  name: { type: String, required: true },
  employee_id: { type: String, required: true },
  department: { type: String, required: true },
  employment_status: { type: String, required: true },
  email: { type: String, required: true },
  accommodation_requests: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require,
  },
  file: {
    data: Buffer,
    contentType: String,
  },
  fileName: { type: String, required: true },
});

module.exports = mongoose.model("Form", formSchema);
