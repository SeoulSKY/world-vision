const { Router } = require("express");
const {escape, getConnection} = require("../../mysqlLib");
const {sendTransaction} = require("./transaction");
const {isValidCustomer} = require("./customer");
const {isValidRecipient} = require("./recipient");

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
 * @param callback A callback function to check the result
 */
function isValidDonation(customerUserId, recipientUserId, callback) {
    getConnection((err, con) => {
        if (err) {
            callback(err);
            return;
        }

        con.query("SELECT * FROM Donation WHERE customerUserId=? AND recipientUserId=?",
            [customerUserId, recipientUserId], (err, result) => {
                if (err) {
                    throw err;
                }

                callback(null, result.length !== 0);
            });
    });
}

donationRouter.get("/", (request, response) => {
    let customerUserId = request.query.customerUserId;
    let recipientUserId = request.query.recipientUserId;

    if (customerUserId === undefined) {
        response.status(400);
        response.send("Missing parameter customerUserId");
        return;
    }

    getConnection((err, con) => {
        if (err) {
            response.status(500);
            response.send("Server couldn't connect to the database");
            return;
        }

        isValidCustomer(customerUserId, (err, valid) => {
            if (err) {
                response.status(500);
                response.send("Server couldn't connect to the database");
                return;
            }

            if (!valid) {
                response.status(404);
                response.send("Customer not found with the given customerUserId \"" + customerUserId + "\"");
                return;
            }

            isValidRecipient(recipientUserId, (err, valid) => {
                if (err) {
                    response.status(500);
                    response.send("Server couldn't connect to the database");
                    return;
                }

                if (!valid) {
                    response.status(404);
                    response.send("Recipient not found with the given recipientUserId \"" + recipientUserId + "\"");
                    return;
                }

                let sql = "SELECT * FROM Donation WHERE customerUserId=" + escape(customerUserId);

                if (recipientUserId !== undefined) {
                    sql += " AND recipientUserId=" + escape(recipientUserId);
                }

                con.query(sql, (err, result) => {
                    if (err) {
                        throw err;
                    }
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
    });
});

donationRouter.post("/", (request, response) => {
    if (!isValidBody(request.body)) {
        response.status(400);
        response.send("Request body doesn't contain required parameters");
        return;
    }

    let customerUserId = request.body.customerUserId;
    let recipientUserId = request.body.recipientUserId;
    let monthlyTransactionAmount = request.body.monthlyTransactionAmount;

    // 1 month from now
    let nextTransactionDate = new Date(Date.now());
    nextTransactionDate.setMonth(nextTransactionDate.getMonth() + 1);

    getConnection((err, con) => {
        if (err) {
            response.status(500);
            response.send("Server couldn't connect to the database");
            return;
        }

        con.query("SELECT * FROM Customer INNER JOIN Card ON Customer.userId=Card.userId WHERE Customer.userId=?",
            [customerUserId], (err, result) => {
                if (err) {
                    throw err;
                }

                if (result.length === 0) {
                    response.status(404);
                    response.send("Given customerUserId \"" + customerUserId + "\" not found in the database");
                    return;
                }

                // convert the result to json format
                let newResult = JSON.parse(JSON.stringify(result));

                const card = {
                    number: newResult[0].number,
                    expirationDate: newResult[0].expirationDate,
                    cvv: newResult[0].cvv
                };

                isValidRecipient(recipientUserId, (err, valid) => {
                    if (err) {
                        response.status(500);
                        response.send("Server couldn't connect to the database");
                        return;
                    }

                    if (!valid) {
                        response.status(404);
                        response.send("Given recipientUserId \"" + recipientUserId + "\" not found in the database");
                        return;
                    }

                    isValidDonation(customerUserId, recipientUserId, (err, valid) => {
                        if (err) {
                            response.status(500);
                            response.send("Server couldn't connect to the database");
                            return;
                        }

                        if (valid) {
                            response.status(409);
                            response.send("Donation between given customer and recipient already exists");
                            return;
                        }

                        let sql = "INSERT INTO Donation (customerUserId, recipientUserId, monthlyTransactionAmount, " +
                            "nextTransactionDate) VALUES (" + escape(customerUserId) + ", " + escape(recipientUserId) +
                            ", " + escape(monthlyTransactionAmount) + ", " + escape(nextTransactionDate) + ")"

                        con.query(sql, err => {
                            if (err) {
                                throw err;
                            }

                            response.status(201);
                            response.send("Created");
                        });

                        sendTransaction(customerUserId, recipientUserId, card, monthlyTransactionAmount,
                            (err) => {
                                if (err) {
                                    throw err;
                                }
                            });

                    });

                });
        });
    });
});

donationRouter.put("/", (request, response) => {
    if (!isValidBody(request.body)) {
        response.status(400);
        response.send("Request body doesn't contain required parameters");
        return;
    }

    let customerUserId = request.body.customerUserId;
    let recipientUserId = request.body.recipientUserId;
    let monthlyTransactionAmount = request.body.monthlyTransactionAmount;

    getConnection((err, con) => {
        if (err) {
            response.status(500);
            response.send("Server couldn't connect to the database");
            return;
        }

        isValidDonation(customerUserId, recipientUserId, (err, valid) => {
            if (err) {
                response.status(500);
                response.send("Server couldn't connect to the database");
                return;
            }

            if (!valid) {
                response.status(404);
                response.send("Donation not found with given customerUserId and recipientUserId");
                return;
            }

            con.query("UPDATE Donation SET monthlyTransactionAmount=? WHERE customerUserId=? AND recipientUserId=?",
                [monthlyTransactionAmount, customerUserId, recipientUserId], err => {
                    if (err) {
                        throw err;
                    }

                    response.status(200);
                    response.send("Updated");
                });
        });
    });
});

donationRouter.delete("/", (request, response) => {
    let customerUserId = request.query.customerUserId;
    let recipientUserId = request.query.recipientUserId;

    if (customerUserId === undefined) {
        response.status(400);
        response.send("Missing customerUserId as a parameter");
        return;
    }

    let sql = "DELETE FROM Donation WHERE customerUserId=" + escape(customerUserId);
    if (recipientUserId !== undefined) {
        sql += " AND recipientUserId=" + escape(recipientUserId);
    }

    getConnection((err, con) => {
        if (err) {
            response.status(500);
            response.send("Server couldn't connect to the database");
            return;
        }

        // check if customerUserId is valid
        isValidCustomer(customerUserId, (err, valid) => {
            if (err) {
                response.status(500);
                response.send("Server couldn't connect to the database");
                return;
            }

            if (!valid) {
                response.status(404);
                response.send("customerUserId \"" + customerUserId + "\" not found in the database");
                return;
            }

            if (recipientUserId !== undefined) {
                isValidRecipient(recipientUserId, (err, valid) => {
                    if (err) {
                        response.status(500);
                        response.send("Server couldn't connect to the database");
                        return;
                    }

                    if (!valid) {
                        response.status(404);
                        response.send("recipientUserId \"" + recipientUserId + "\" not found in the database");
                        return;
                    }

                    isValidDonation(customerUserId, recipientUserId, (err, valid) => {
                        if (!valid) {
                            response.status(404);
                            response.send("Donation with customerUserId \"" + customerUserId +
                                "\" and recipientUserId \"" + recipientUserId + "\" not found in the database");
                            return;
                        }

                        con.query(sql, err => {
                            if (err) {
                                throw err;
                            }
                            response.status(200);
                            response.send("Deleted");
                        });
                    });
                });
            } else {
                isValidDonation(customerUserId, recipientUserId, (err, valid) => {
                    if (!valid) {
                        response.status(404);
                        response.send("Donation with customerUserId \"" + customerUserId +
                            "\" and recipientUserId \"" + recipientUserId + "\" not found in the database");
                        return;
                    }

                    con.query(sql, err => {
                        if (err) {
                            throw err;
                        }
                        response.status(200);
                        response.send("Deleted");
                    });
                });
            }
        });
    });
});

module.exports = {
    donationRouter,
    isValidDonation
};