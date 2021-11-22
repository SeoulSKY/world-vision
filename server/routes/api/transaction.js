const { Router } = require("express");
const {escape, getPool} = require("../../mysqlLib");
const {checkIfCustomerExists} = require("./customer");
const {checkIfRecipientExists} = require("./recipient");

/**
 * Check if the given request body is valid for POST request
 * @param body the body to check
 * @returns {boolean} true if it is valid, false otherwise
 */
function isValidBody(body) {
    return body.customerUserId !== undefined &&
        body.recipientUserId !== undefined &&
        body.amount !== undefined;
}

/**
 * Charge the given amount
 * @param customerUserId The customerUserId who is going to send transaction
 * @param recipientUserId The recipient who is going to receive the transaction
 * @param card the card object containing number, expirationDate, and cvv
 * @param amount the amount to charge
 */
async function sendTransaction(customerUserId, recipientUserId, card, amount) {
    // send transaction
    console.log("We earned " + amount + " dollars!");

    getPool.then(pool => {
        pool.query("INSERT INTO Transaction (customerUserId, recipientUserId, amount) VALUES (?, ?, ?)",
            [customerUserId, recipientUserId, amount]).then(() => {});
    });
}

const transactionRouter = Router();

transactionRouter.get("/", (request, response) => {
    let customerUserId = request.query.customerUserId;
    let recipientUserId = request.query.recipientUserId;

    if (customerUserId === undefined) {
        response.status(400).send("Missing parameter customerUserId");
        return;
    }

    checkIfCustomerExists(customerUserId).then(exist => {
        if (!exist) {
            response
                .status(404)
                .send("Customer not found with the given customerUserId \"" + customerUserId + "\"");
            return;
        }

        checkIfRecipientExists(recipientUserId).then(exist => {
            if (recipientUserId !== undefined && !exist) {
                response
                    .status(404)
                    .send("Recipient not found with the given recipientUserId \"" + recipientUserId + "\"");
                return;
            }

            let sql = "SELECT * FROM Transaction WHERE customerUserId=" + escape(customerUserId);

            if (recipientUserId !== undefined) {
                sql += " AND recipientUserId=" + escape(recipientUserId);
            }

            getPool.then(pool => {
                pool.query(sql).then(result => {
                    // convert the result to json format
                    let newResult = JSON.parse(JSON.stringify(result));

                    let array = [];
                    for (let i = 0; i < newResult.length; i++) {
                        let json = {
                            id: newResult[i].id,
                            customerUserId: newResult[i].customerUserId,
                            recipientUserId: newResult[i].recipientUserId,
                            amount: newResult[i].amount,
                            timestamp: newResult[i].timestamp
                        };

                        array.push(json);
                    }

                    response.json(array);
                });
            });
        });
    }).catch(() => response.status(500).send("Server couldn't connect to the database"));
});

transactionRouter.post("/", (request, response) => {
    if (!isValidBody(request.body)) {
        response.status(400).send("Request body doesn't contain required parameters");
        return;
    }

    let customerUserId = request.body.customerUserId;
    let recipientUserId = request.body.recipientUserId;
    let amount = request.body.amount;

    getPool.then(pool => {
        pool.query("SELECT * FROM Customer INNER JOIN Card ON Customer.userId=Card.userId WHERE Customer.userId=?",
            [customerUserId]).then(result => {
            if (result.length === 0) {
                response
                    .status(404)
                    .send("Given customerUserId \"" + customerUserId + "\" not found in the database");
                return;
            }

            // convert the result to json format
            let newResult = JSON.parse(JSON.stringify(result));

            const card = {
                number: newResult[0].number,
                expirationDate: newResult[0].expirationDate,
                cvv: newResult[0].cvv
            };

            checkIfRecipientExists(recipientUserId).then(exist => {
                if (!exist) {
                    response
                        .status(404)
                        .send("Given recipientUserId \"" + recipientUserId + "\" not found in the database");
                    return;
                }

                sendTransaction(customerUserId, recipientUserId, card, amount)
                    .then(() => response.status(200).send("Created"));
            });
        });
    }).catch(() => response.status(500).send("Server couldn't connect to the database"));
});

transactionRouter.delete("/", (request, response) => {
    let customerUserId = request.query.customerUserId;
    let recipientUserId = request.query.recipientUserId;

    if (customerUserId === undefined) {
        response.status(400).send("Missing customerUserId as a parameter");
        return;
    }

    let sql = "DELETE FROM Transaction WHERE customerUserId=" + escape(customerUserId);
    if (recipientUserId !== undefined) {
        sql += " AND recipientUserId=" + escape(recipientUserId);
    }

    checkIfCustomerExists(customerUserId).then(exist => {
        if (!exist) {
            response.status(404).send("customerUserId \"" + customerUserId + "\" not found in the database");
            return;
        }

        if (recipientUserId === undefined) {
            getPool.then(pool => {
                pool.query(sql).then(() => response.status(200).send("Deleted"));
            });
        } else {
            checkIfRecipientExists(recipientUserId).then(exist => {
                if (!exist) {
                    response
                        .status(404)
                        .send("recipientUserId \"" + recipientUserId + "\" not found in the database");
                    return;
                }

                getPool.then(pool => {
                    pool.query(sql).then(() => response.status(200).send("Deleted"))
                });
            });
        }
    }).catch(() => response.status(500).send("Server couldn't connect to the database"));
});

module.exports = {
    transactionRouter,
    sendTransaction
};
