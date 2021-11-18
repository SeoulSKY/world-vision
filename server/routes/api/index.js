const { Router } = require("express");

const { customerRouter } = require("./customer");
const { donationRouter } = require("./donation");
const { recipientRouter } = require("./recipient");
const { staffRouter } = require("./staff");
const { transactionRouter } = require("./transaction");

const apiRouter = Router();

apiRouter.use("/customer", customerRouter);
apiRouter.use("/donation", donationRouter);
apiRouter.use("/recipient", recipientRouter);
apiRouter.use("/staff", staffRouter);
apiRouter.use("/transaction", transactionRouter);

// Endpoint for smoke test
apiRouter.get("/hello", (request, response) => {
    response.send("Hello from API");
})

module.exports = {
    apiRouter,
}
