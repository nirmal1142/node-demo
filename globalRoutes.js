const express = require("express");
const app = express();

// define all route imports here
const contactRoute = require("./routes/contact/contact");

// define all routes here

app.use("/contact", contactRoute);

module.exports = app;
