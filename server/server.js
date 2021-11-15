"use strict";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// read .env file
require("dotenv").config();

// initialize the database
require("./mysqlLib").init();

const { apiRouter } = require("./routes/api");

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended : true }));

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.use("/api", apiRouter);

app.listen(PORT, HOST, () => {console.log("Started listening " + HOST + ":" + PORT)});
