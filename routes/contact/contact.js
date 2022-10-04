const express = require("express");
const router = express.Router();
const contactController = require("../../controllers/contact/contact");
const {validate} = require("../../utils/utils")
const Joi = require("joi");

const contactValidation = Joi.object()
.keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    userName: Joi.string().required(),
    password: Joi.string().required(),
    phoneNo: Joi.string().required(),
    address: Joi.string().required()
});
router.post("/add-contact",validate(contactValidation), contactController.createContact);
router.put("/edit-contact/id=:contactId",validate(contactValidation), contactController.editContact);
router.put("/contact-favourite/id=:contactId", contactController.favouriteContact);
router.delete("/delete-contact/id=:contactId", contactController.deleteContact);
router.get("/list-contact/", contactController.getAllContact);
module.exports = router;
// validate("body", contactController.validation),
