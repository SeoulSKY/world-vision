"use strict";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mySql = require("mysql");

const { apiRouter } = require("./routes/api");

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended : true }));

const PORT = 5000;
const HOST = "0.0.0.0";

let con = mySql.createConnection({
    host: HOST,
    user: "root",
    database: "user",
    password: "cmpt353"
});

app.use("/api", apiRouter);

app.listen(PORT, HOST, () => {console.log("Started listening " + HOST + ":" + PORT)});
