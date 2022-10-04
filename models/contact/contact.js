const mongoose = require("mongoose");
const contact = require("../../controllers/contact/contact");

const contactSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    userName: String,
    password: String,
    phoneNo: String,
    address: String,
    isFavourite: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
    autoCreate: true,
  }
);
module.exports = mongoose.model("contactmasters", contactSchema);
