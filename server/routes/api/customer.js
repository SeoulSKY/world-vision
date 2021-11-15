const { Router } = require("express");

const customerRouter = Router();

customerRouter.get("/", (request, response) => {
    response.send("Hello from customer GET");
});

customerRouter.post("/", (request, response) => {
    response.send("Hello from customer POST");
});

customerRouter.put("/", (request, response) => {
    response.send("Hello from customer PUT");
});

customerRouter.delete("/", (request, response) => {
    response.send("Hello from customer DELETE");
});

module.exports = {
    customerRouter,
};