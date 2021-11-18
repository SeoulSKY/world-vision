const { Router } = require("express");
const {escape, getPool} = require("../../mysqlLib");
const {sendTransaction} = require("./transaction");
const {checkIfCustomerExists} = require("./customer");
const {checkIfRecipientExists} = require("./recipient");

const donationRouter = Router();

/**
 * Check if the given request body is valid for POST and PUT request
 * @param body the body to check
 * @returns {boolean} true if it is valid, false otherwise
 */
function isValidBody(body) {
    return body.customerUserId !== undefined &&
        body.recipientUserId !== undefined &&
        body.monthlyTransactionAmount !== undefined;
}

/**
 * Check if there is a donation for given customer user id and recipient user id
 * @param customerUserId The customer user id to check
 * @param recipientUserId The recipient user id to check
 * @return true if the donation exists, false otherwise
 */
async function checkIfDonationExists(customerUserId, recipientUserId) {
    let pool = await getPool;
    let result = await pool.query("SELECT * FROM Donation WHERE customerUserId=? AND recipientUserId=?",
        [customerUserId, recipientUserId]);
    return result.length !== 0;
}

donationRouter.get("/", (request, response) => {
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

            let sql = "SELECT * FROM Donation WHERE customerUserId=" + escape(customerUserId);

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
                           monthlyTransactionAmount: newResult[i].monthlyTransactionAmount,
                           nextTransactionDate: newResult[i].nextTransactionDate
                       };

                       array.push(json);
                   }

                   response.json(array);
               });
            });
        });
    }).catch(() => response.status(500).send("Server couldn't connect to the database"));
});

donationRouter.post("/", (request, response) => {
    if (!isValidBody(request.body)) {
        response.status(400).send("Request body doesn't contain required parameters");
        return;
    }

    let customerUserId = request.body.customerUserId;
    let recipientUserId = request.body.recipientUserId;
    let monthlyTransactionAmount = request.body.monthlyTransactionAmount;

    // 1 month from now
    let nextTransactionDate = new Date(Date.now());
    nextTransactionDate.setMonth(nextTransactionDate.getMonth() + 1);

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

                checkIfDonationExists(customerUserId, recipientUserId).then(exist => {
                    if (exist) {
                        response
                            .status(409)
                            .send("Donation between given customer and recipient already exists");
                        return;
                    }

                    let sql = "INSERT INTO Donation (customerUserId, recipientUserId, monthlyTransactionAmount, " +
                        "nextTransactionDate) VALUES (" + escape(customerUserId) + ", " + escape(recipientUserId) +
                        ", " + escape(monthlyTransactionAmount) + ", " + escape(nextTransactionDate) + ")"

                    pool.query(sql).then(() => response.status(201).send("Created"));
                    sendTransaction(customerUserId, recipientUserId, card, monthlyTransactionAmount).then(() => {});
                });
            });
        });
    }).catch(() => response.status(500).send("Server couldn't connect to the database"));
});

donationRouter.put("/", (request, response) => {
    if (!isValidBody(request.body)) {
        response.status(400).send("Request body doesn't contain required parameters");
        return;
    }

    let customerUserId = request.body.customerUserId;
    let recipientUserId = request.body.recipientUserId;
    let monthlyTransactionAmount = request.body.monthlyTransactionAmount;

    checkIfDonationExists(customerUserId, recipientUserId).then(exist => {
        if (!exist) {
            response.status(404).send("Donation not found with given customerUserId and recipientUserId");
            return;
        }

        getPool.then(pool => {
            pool.query("UPDATE Donation SET monthlyTransactionAmount=? WHERE customerUserId=? AND recipientUserId=?",
                [monthlyTransactionAmount, customerUserId, recipientUserId])
                .then(() => response.status(200).send("Updated"));
        });
    }).catch(() => response.status(500).send("Server couldn't connect to the database"));
});

donationRouter.delete("/", (request, response) => {
    let customerUserId = request.query.customerUserId;
    let recipientUserId = request.query.recipientUserId;

    if (customerUserId === undefined) {
        response.status(400).send("Missing customerUserId as a parameter");
        return;
    }

    let sql = "DELETE FROM Donation WHERE customerUserId=" + escape(customerUserId);
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

                checkIfDonationExists(customerUserId, recipientUserId).then(() => {
                    if (!exist) {
                        response.status(404).send("Donation with customerUserId \"" + customerUserId +
                            "\" and recipientUserId \"" + recipientUserId + "\" not found in the database");
                        return;
                    }

                    getPool.then(pool => {
                        pool.query(sql).then(() => response.status(200).send("Deleted"))
                    });
                });
            });
        }
    }).catch(() => response.status(500).send("Server couldn't connect to the database"));
});

module.exports = {
    donationRouter,
    isValidDonation: checkIfDonationExists
};
