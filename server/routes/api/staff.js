const { Router } = require("express");

const staffRouter = Router();

staffRouter.get("/", (request, response) => {
    response.send("Hello from staff GET");
});

staffRouter.post("/", (request, response) => {
   response.send("Hello from staff POST");
});

staffRouter.put("/", (request, response) => {
    response.send("Hello from staff PUT");
});

staffRouter.delete("/", (request, response) => {
    response.send("Hello from staff DELETE");
});

module.exports = {
    staffRouter,
};
