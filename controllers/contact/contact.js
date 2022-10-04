const enums = require("../../json/enums.json");
const contactSchema = require("../../models/contact/contact");
const bcrypt = require("bcryptjs");
const messages = require("../../json/message.json");

module.exports = {
  createContact: async (req, res) => {
    const { firstName, lastName, email, userName, password, phoneNo, address } = req.body;
    if (!firstName || !lastName || !email || !userName || !password || !phoneNo || !address) {
      const responseObject = {
        result: -1,
        message: messages.INVALID_PARAMETERS,
        payload: {},
      };
      return res.status(enums.HTTP_CODES.BAD_REQUEST).json({ responseObject });
    }
    try {
      let hashPassword = await bcrypt.hash(password, 10);
      let contactCreate = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        userName: userName,
        password: hashPassword,
        phoneNo: phoneNo,
        address: address,
      };
      const newContact = new contactSchema(contactCreate);
      let data = await newContact.save();
      const responseObject = {
        result: 0,
        message: messages.ITEM_INSERTED,
        payload: { data },
      };
      return res.status(enums.HTTP_CODES.OK).json(responseObject);
    } catch (error) {
      const responseObject = {
        result: -1,
        message: messages.GENERAL,
        payload: {},
      };
      res.status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR).json(responseObject);
    }
  },

  editContact: async (req, res) => {
    const { contactId } = req.params;
    try {
      const contactData = await contactSchema.findByIdAndUpdate({ _id: contactId }, req.body, { new: true });
      const responseObject = {
        result: 0,
        message: messages.ITEM_UPDATED,
        payload: { contactData },
      };
      res.status(enums.HTTP_CODES.OK).json(responseObject);
    } catch (error) {
      const responseObject = {
        result: -1,
        message: messages.GENERAL,
        payload: {},
      };
      res.status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR).json(responseObject);
    }
  },

  favouriteContact: async (req, res) => {
    const { contactId, favouriteFlag } = req.params;
    const { flag } = req.query;
    try {
      let favouriteContact = { isFavourite: flag };
      console.log(flag)
      const contactData = await contactSchema.findByIdAndUpdate({ _id: contactId }, favouriteContact , { new: true });
      const responseObject = {
        result: 0,
        message: flag === true ? messages.ITEM_FAVOURITE : messages.ITEM_UNFAVOURITE,
        payload: {contactData},
      };
      res.status(enums.HTTP_CODES.OK).json(responseObject);
    } catch (error) {
      const responseObject = {
        result: -1,
        message: messages.GENERAL,
        payload: {},
      };
      res.status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR).json(responseObject);
    }
  },

  deleteContact: async (req, res) => {
    const { contactId } = req.params;
    const contactData = await contactSchema.findOne({ _id: contactId });
    if (!contactData) {
      const responseObject = {
        result: 0,
        message: messages.ITEM_NOT_FOUND,
        payload: {},
      };
      res.status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR).json(responseObject);
    }

    try {
      const deleteContact = await contactSchema.findOneAndDelete({ _id: contactId });
      const responseObject = {
        result: 0,
        message: messages.ITEM_DELETED,
        payload: {},
      };
      res.status(enums.HTTP_CODES.OK).json(responseObject);
    } catch (error) {
      const responseObject = {
        result: -1,
        message: messages.GENERAL,
        payload: {},
      };
      res.status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR).json(responseObject);
    }
  },
  getAllContact: async (req, res) => {
    try {
      let contact = await contactSchema.find();
      const responseObject = {
        result: 0,
        message: messages.ITEM_FETCHED,
        payload: { contact },
      };
      res.status(enums.HTTP_CODES.OK).json(responseObject);
    } catch (error) {
      console.log(error)
      const responseObject = {
        result: -1,
        message: messages.GENERAL,
        payload: {},
      };
      res.status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR).json(responseObject);
    }
  },
};
