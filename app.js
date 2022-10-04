require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require("cors");
const routes = require("./globalRoutes");
const e = require("express");

// Middleware
const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api/v1", routes);

// Connect to MongoDb
mongoose
  .connect("http://mongodb://localhost:27017/contactManagment", {
    useNewUrlParser: true,
    useUnifiedTopology: true,

    useCreateIndex: true,
    useFindAndModify: false,
  })

  .then(async () => {
    const port = process.env.PORT || 8080;
    app.listen(port);

    console.log(`Server serve with port number: ${port} ...🚀🚀`);
    console.log("mongoDB connected.....");
  })

  .catch((err) => {
    console.log(err);
  });
