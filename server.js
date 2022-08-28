const path = require("path");

const fileUpload = require("express-fileupload");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDb = require("./config/database");
const { errorHandler } = require("./middlewares/errors");
const { setHeaders } = require("./middlewares/headers");

const app = express();

// load config
dotenv.config({ path: "./config/config.env" });

//dabase
connectDb();

//body parse
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(setHeaders);
//File upload middlware
app.use(fileUpload());

// publics
app.use(express.static(path.join(__dirname, "/public")));

// routes
app.use("/", require("./routes/shop"));
app.use("/users", require("./routes/Users"));
app.use("/dashboard", require("./routes/dashboard"));

//errors handler
app.use(errorHandler);
//env
const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(
    `server is running on port ${PORT} and start in ${process.env.NODE_ENV} mod`
  )
);
