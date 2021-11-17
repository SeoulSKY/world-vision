const { Router } = require("express");
const {escape, getConnection} = require("../../mysqlLib");

/**
 * Charge the given amount
 * @param customerUserId The customerUserId who is going to send transaction
 * @param recipientUserId The recipient who is going to recieve the transaction
 * @param card the card object containing number, expirationDate, and cvv
 * @param amount the amount to charge
 * @param callback the function to be called when everything is done
 */
function sendTransaction(customerUserId, recipientUserId, card, amount, callback) {

    // send transaction
    console.log("We earned " + amount + " dollars!");

    getConnection((err, con) => {
        if (err) {
            callback(err);
            return;
        }

        // add transaction history
        con.query("INSERT INTO Transaction (customerUserId, recipientUserId, amount) VALUES (?, ?, ?)",
            [customerUserId, recipientUserId, amount], err => {
            if (err) {
                throw err;
            }

            callback(null);
            });
    });
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