const { Router } = require("express");

const donationRouter = Router();

donationRouter.get("/", (request, response) => {
    response.send("Hello from donation GET");
});

donationRouter.post("/", (request, response) => {
    response.send("Hello from donation POST");
});

donationRouter.put("/", (request, response) => {
    response.send("Hello from donation PUT");
});

donationRouter.delete("/", (request, response) => {
    response.send("Hello from donation DELETE");
});

module.exports = {
    donationRouter,
};