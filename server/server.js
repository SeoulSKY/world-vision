"use strict";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mySql = require("mysql");

const server = express();

server.use(cors({ origin: "*" }));
server.use(bodyParser.urlencoded({ extended : true }));

const PORT = 5000;
const HOST = "0.0.0.0";

let con = mySql.createConnection({
    host: HOST,
    user: "root",
    database: "user",
    password: "cmpt353"
});

server.get("/api/hello", (request, response) => {
    response.send("Hello from the server");
});

server.listen(PORT, HOST, () => {console.log("Started listening " + HOST + ":" + PORT)});