const { Router } = require("express");

const transactionRouter = Router();

transactionRouter.get("/", (request, response) => {
    response.send("Hello from transaction GET");
});

transactionRouter.post("/", (request, response) => {
    response.send("Hello from transaction POST");
});

transactionRouter.delete("/", (request, response) => {
    response.send("Hello from transaction DELETE");
});

module.exports = {
    transactionRouter,
};