"use strict";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// read .env file
require("dotenv").config();

const { apiRouter } = require("./routes/api");

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended : true }));

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.use("/api", apiRouter);

// initialize the database
require("./mysqlLib").init(err => {
    if (err) {
        console.log("Database is not yet ready to be used. Please try running the server later");
        process.exit(0);
    }

    app.listen(PORT, HOST, () => {console.log("Started listening " + HOST + ":" + PORT)});
});
