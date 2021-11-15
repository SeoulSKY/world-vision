const { Router } = require("express");

const recipientRouter = Router();

recipientRouter.get("/", (request, response) => {
    response.send("Hello from recipient GET");
});

recipientRouter.post("/", (request, response) => {
    response.send("Hello from recipient POST");
});

recipientRouter.put("/", (request, response) => {
    response.send("Hello from recipient PUT");
});

recipientRouter.delete("/", (request, response) => {
    response.send("Hello from recipient DELETE");
});

module.exports = {
    recipientRouter,
};