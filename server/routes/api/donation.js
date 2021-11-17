const { Router } = require("express");
const {escape, getConnection} = require("../../mysqlLib");
const {sendTransaction} = require("./transaction");

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

        // check if the given customerUserId is valid
        con.query("SELECT * FROM Customer WHERE userId=?", [customerUserId], (err, result) => {
            if (err) {
                throw err;
            } else if (result.length === 0) {
                response.status(404);
                response.send("Customer not found with the given customerUserId \"" + customerUserId + "\"");
                return;
            }

            // check if the given recipientUserId is valid
            con.query("SELECT * FROM Recipient WHERE userId=?", [recipientUserId], (err, result) => {
                if (err) {
                    throw err
                } else if (recipientUserId !== undefined && result.length === 0) {
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

                // check if the recipientUserId is valid
                con.query("SELECT * FROM Recipient WHERE userId=?", [recipientUserId], (err, result) => {
                    if (err) {
                        throw err;
                    }

                    if (result.length === 0) {
                        response.status(404);
                        response.send("Given recipientUserId \"" + recipientUserId + "\" not found in the database");
                        return;
                    }

                    // check if the donation between both users already exists
                    con.query("SELECT * FROM Donation WHERE customerUserId=? AND recipientUserId=?",
                        [customerUserId, recipientUserId], (err, result) => {
                        if (err) {
                            throw err;
                        }

                        if (result.length !== 0) {
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

                        sendTransaction(newResult[0].number, newResult[0].expirationDate, newResult[0].cvv,
                            monthlyTransactionAmount, (err) => {
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

        // check if the donation exists
        con.query("SELECT * FROM Donation WHERE customerUserId=? AND recipientUserId=?",
            [customerUserId, recipientUserId], (err, result) => {
            if (err) {
                throw err;
            }

            if (result.length === 0) {
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
        con.query("SELECT * FROM Customer WHERE userId=?", [customerUserId], (err, result) => {
            if (err) {
                throw err;
            }

            if (result.length === 0) {
                response.status(404);
                response.send("customerUserId \"" + customerUserId + "\" not found in the database");
                return;
            }

            if (recipientUserId !== undefined) {
                // check if recipientUserId exists
                con.query("SELECT * FROM Recipient WHERE userId=?", [recipientUserId], (err, result) => {
                    if (err) {
                        throw err;
                    }

                    if (result.length === 0) {
                        response.status(404);
                        response.send("recipientUserId \"" + recipientUserId + "\" not found in the database");
                        return;
                    }

                    // check if the donation exists
                    con.query("SELECT * FROM Donation WHERE customerUserId=? AND recipientUserId=?",
                        [customerUserId, recipientUserId], (err, result) => {
                        if (err) {
                            throw err;
                        }

                        if (result.length === 0) {
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
                // check if the donation exists
                con.query("SELECT * FROM Donation WHERE customerUserId=?", [customerUserId], (err, result) => {
                    if (err) {
                        throw err;
                    }

                    if (result.length === 0) {
                        response.status(404);
                        response.send("Donation with customerUserId \"" + customerUserId +
                            "\" not found in the database");
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
};