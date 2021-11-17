const { Router } = require("express");
const {escape, getConnection} = require("../../mysqlLib");

const customerRouter = Router();

/**
 * Check if the given request body is valid for POST and PUT request
 * @param body the body to check
 * @returns {boolean} true if it is valid, false otherwise
 */
function isValidBody(body) {
    return body.userId !== undefined &&
        body.firstName !== undefined &&
        body.lastName !== undefined &&
        body.billingAddress !== undefined &&
        body.billingAddress.street !== undefined &&
        body.billingAddress.city !== undefined &&
        body.billingAddress.province !== undefined &&
        body.billingAddress.postalCode !== undefined &&
        body.billingAddress.country !== undefined &&
        body.card !== undefined &&
        body.card.number !== undefined &&
        body.card.expirationDate !== undefined &&
        body.card.cvv !== undefined
}

/**
 * Check if the given customer id is valid
 * @param customerUserId The user id to check
 * @param callback A callback function to check the result
 */
function isValidCustomer(customerUserId, callback) {
    getConnection((err, con) => {
        if (err) {
            callback(err);
            return;
        }

        con.query("SELECT * FROM Customer WHERE userId=?", [customerUserId], (err, result) => {
            if (err) {
                throw err;
            }

            callback(null, result.length !== 0);
        });
    });
}

customerRouter.get("/", (request, response) => {
    let sql = "SELECT * FROM Customer INNER JOIN Address ON Customer.userId=Address.userId INNER JOIN Card ON Customer.userId=Card.userId";

    let userId = request.query.userId;
    if (userId !== undefined) {
        sql += " WHERE Customer.userId=" + escape(userId);
    }

    getConnection((err, con) => {
        if (err) {
            response.status(500);
            response.send("Server couldn't connect to the database");
            return;
        }

        con.query(sql, (err, result) => {
            if (err) {
                throw err;
            }
            // convert the result to json format
            let newResult = JSON.parse(JSON.stringify(result));

            if (userId !== undefined && newResult.length === 0) {
                response.status(404);
                response.send("Customer not found with the given userId \"" + userId + "\"");
                return;
            }

            let array = [];
            for (let i = 0; i < newResult.length; i++) {
                let json = {
                    userId: newResult[i].userId,
                    firstName: newResult[i].firstName,
                    lastName: newResult[i].lastName,
                    billingAddress: {
                        street: newResult[i].street,
                        city: newResult[i].city,
                        province: newResult[i].province,
                        postalCode: newResult[i].postalCode,
                        country: newResult[i].country
                    },
                    card: {
                        number: newResult[i].number,
                        expirationDate: newResult[i].expirationDate,
                        cvv: newResult[i].cvv
                    },
                };

                if (newResult.middleName !== undefined) {
                    json.middleName = newResult[i].middleName;
                }

                array.push(json);
            }

            response.json(array);
        });
    });
});

customerRouter.post("/", (request, response) => {
    if (!isValidBody(request.body)) {
        response.status(400);
        response.send("Request body doesn't contain required parameters");
        return;
    }

    let userId = request.body.userId;
    let firstName = request.body.firstName;
    let lastName = request.body.lastName;
    let middleName = request.body.middleName;
    let billingAddress = request.body.billingAddress;
    let card = request.body.card;

    let street = billingAddress.street;
    let city = billingAddress.city;
    let province = billingAddress.province;
    let postalCode = billingAddress.postalCode;
    let country = billingAddress.country;

    let number = card.number;
    let expirationDate = card.expirationDate;
    let cvv = card.cvv;

    if (new Date(expirationDate).toString() === "Invalid Date") {
        response.status(400);
        response.send("The format of the given expirationDate is invalid");
        return;
    }

    getConnection((err, con) => {
        if (err) {
            response.status(500);
            response.send("Server couldn't connect to the database");
            return;
        }

        isValidCustomer(userId, (err, valid) => {
            if (err) {
                response.status(500);
                response.send("Server couldn't connect to the database");
                return;
            }

            if (valid) {
                response.status(409);
                response.send("userId \"" + userId + "\" already in use");
                return;
            }

            let sql = "INSERT INTO Customer (userId, firstName, lastName";
            if (middleName === undefined) {
                sql += ") VALUES (" + escape(userId) + ", " + escape(firstName) + ", " + escape(lastName) + ")";
            } else {
                sql += ", middleName) VALUES (" + escape(userId) + ", " + escape(firstName) + ", " +
                    escape(lastName) + ", " + escape(middleName) + ")";
            }

            sql += ";INSERT INTO Address (userId, street, city, province, postalCode, country) VALUES (" +
                escape(userId) + ", " + escape(street) + ", " + escape(city) + ", " + escape(province) + ", " +
                escape(postalCode) + ", " + escape(country) + ")";

            sql += ";INSERT INTO AccountType (userId, type) VALUES (" + escape(userId) + ", \"Customer\")";

            sql += ";INSERT INTO Card (userId, number, expirationDate, cvv) VALUES (" + escape(userId) + ", " +
                escape(number) + ", " + escape(expirationDate) + ", " + escape(cvv) + ")";

            con.query(sql, err => {
                if (err) {
                    throw err;
                }

                response.status(201);
                response.send("Created");
            });
        });
    });
});

customerRouter.put("/", (request, response) => {
    if (!isValidBody(request.body)) {
        response.status(400);
        response.send("Request body doesn't contain required parameters");
        return;
    }

    let userId = request.body.userId;
    let firstName = request.body.firstName;
    let lastName = request.body.lastName;
    let middleName = request.body.middleName;
    let billingAddress = request.body.billingAddress;
    let card = request.body.card;

    let street = billingAddress.street;
    let city = billingAddress.city;
    let province = billingAddress.province;
    let postalCode = billingAddress.postalCode;
    let country = billingAddress.country;

    let number = card.number;
    let expirationDate = card.expirationDate;
    let cvv = card.cvv;

    if (new Date(expirationDate).toString() === "Invalid Date") {
        response.status(400);
        response.send("The format of the given expirationDate is invalid");
        return;
    }

    getConnection((err, con) => {
        if (err) {
            response.status(500);
            response.send("Server couldn't connect to the database");
            return;
        }

        isValidCustomer(userId, (err, valid) => {
            if (err) {
                response.status(500);
                response.send("Server couldn't connect to the database");
                return;
            }

            if (!valid) {
                response.status(404);
                response.send("Customer not found with the given userId \"" + userId + "\"");
                return;
            }

            let sql = "UPDATE Customer SET firstName=" + escape(firstName) + ", lastName=" + escape(lastName);

            if (middleName !== undefined) {
                sql += ", middleName=" + escape(middleName);
            }

            sql += " WHERE userId=" + escape(userId);

            sql += ";UPDATE Address SET street=" + escape(street) + ", city=" + escape(city) + ", province=" +
                escape(province) + ", postalCode=" + escape(postalCode) + ", country=" + escape(country) +
                "WHERE userId=" + escape(userId);

            sql += ";UPDATE Card SET number=" + escape(number) + ", expirationDate=" +
                escape(expirationDate) + ", cvv=" + escape(cvv);

            con.query(sql, err => {
                if (err) {
                    throw err;
                }

                response.status(200);
                response.send("Updated");
            });
        });
    });
});

customerRouter.delete("/", (request, response) => {
    let userId = request.query.userId;
    if (userId === undefined) {
        response.status(400);
        response.send("Parameter userId is missing");
        return;
    }

    getConnection((err, con) => {
        if (err) {
            response.status(500);
            response.send("Server couldn't connect to the database");
            return;
        }

        // check if the given userId exists
        isValidCustomer(userId, (err, valid) => {
            if (err) {
                response.status(500);
                response.send("Server couldn't connect to the database");
                return;
            }

            if (!valid) {
                response.status(404);
                response.send("Customer not found with the given userId \"" + userId + "\"");
                return;
            }

            let sql = "DELETE FROM Customer WHERE userId=" + escape(userId);
            sql += ";DELETE FROM Address WHERE userId=" + escape(userId);
            sql += ";DELETE FROM AccountType WHERE userId=" + escape(userId);
            sql += ";DELETE FROM Card WHERE userId=" + escape(userId);
            sql += ";DELETE FROM Donation WHERE customerUserId=" + escape(userId);
            sql += ";DELETE FROM Transaction WHERE customerUserId=" + escape(userId);

            con.query(sql, (err) => {
                if (err) {
                    throw err;
                }
                response.status(200);
                response.send("Deleted");
            });
        });
    });
});

module.exports = {
    customerRouter,
    isValidCustomer
};