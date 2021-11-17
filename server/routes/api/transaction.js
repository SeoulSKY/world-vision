const { Router } = require("express");
const {escape, getConnection} = require("../../mysqlLib");

/**
 * Charge the given amount
 * @param cardNumber the card number
 * @param expirationDate the expiration date of the card
 * @param cvv the cvv of the card
 * @param amount the amount to charge
 * @param callback the function to be called when everything is done
 */
function sendTransaction(cardNumber, expirationDate, cvv, amount, callback) {
    console.log("We earned " + amount + " dollars!");
    callback(null);
}

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
    sendTransaction
};