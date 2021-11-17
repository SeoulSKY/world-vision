const { Router } = require("express");
const { getConnection, escape } = require("../../mysqlLib");

const staffRouter = Router();

/**
 * Check if the given request body is valid for POST and PUT request
 * @param body the body to check
 * @returns {boolean} true if it is valid, false otherwise
 */
function isValidBody(body) {
    return body.userId !== undefined &&
        body.firstName !== undefined &&
        body.lastName !== undefined &&
        body.homeAddress !== undefined &&
        body.homeAddress.street !== undefined &&
        body.homeAddress.city !== undefined &&
        body.homeAddress.province !== undefined &&
        body.homeAddress.postalCode !== undefined &&
        body.homeAddress.country !== undefined
}

staffRouter.get("/", (request, response) => {
    let sql = "SELECT * FROM Staff INNER JOIN Address ON Staff.userId=Address.userId";

    let userId = request.query.userId;
    if (userId !== undefined) {
        sql += " WHERE Staff.userId=" + escape(userId);
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
                response.send("Staff not found with the given userId \"" + userId + "\"");
                return;
            }

            let array = [];
            for (let i = 0; i < newResult.length; i++) {
                let json = {
                    userId: newResult[i].userId,
                    firstName: newResult[i].firstName,
                    lastName: newResult[i].lastName,
                    homeAddress: {
                        street: newResult[i].street,
                        city: newResult[i].city,
                        province: newResult[i].province,
                        postalCode: newResult[i].postalCode,
                        country: newResult[i].country
                    }
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

staffRouter.post("/", (request, response) => {
    if (!isValidBody(request.body)) {
        response.status(400);
        response.send("Request body doesn't contain required parameters");
        return;
    }

    let userId = request.body.userId;
    let firstName = request.body.firstName;
    let lastName = request.body.lastName;
    let middleName = request.body.middleName;
    let homeAddress = request.body.homeAddress;

    let street = homeAddress.street;
    let city = homeAddress.city;
    let province = homeAddress.province;
    let postalCode = homeAddress.postalCode;
    let country = homeAddress.country;

    getConnection((err, con) => {
        if (err) {
            response.status(500);
            response.send("Server couldn't connect to the database");
            return;
        }

        // check if the userId is already in use
        con.query("SELECT * FROM Staff WHERE userId=?", [userId], (err, result) => {
            if (err) {
                throw err;
            }

            if (result.length !== 0) {
                response.status(409);
                response.send("userId \"" + userId + "\" already in use");
                return;
            }

            let sql = "INSERT INTO Staff (userId, firstName, lastName";
            if (middleName === undefined) {
                sql += ") VALUES (" + escape(userId) + ", " + escape(firstName) + ", " + escape(lastName) + ")";
            } else {
                sql += ", middleName) VALUES (" + escape(userId) + ", " + escape(firstName) + ", " +
                    escape(lastName) + ", " + escape(middleName) + ")";
            }

            sql += ";INSERT INTO Address (userId, street, city, province, postalCode, country) VALUES (" +
                escape(userId) + ", " + escape(street) + ", " + escape(city) + ", " + escape(province) + ", " +
                escape(postalCode) + ", " + escape(country) + ")";

            sql += ";INSERT INTO AccountType (userId, type) VALUES (" + escape(userId) + ", \"Staff\")";

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

staffRouter.put("/", (request, response) => {
    if (!isValidBody(request.body)) {
        response.status(400);
        response.send("Request body doesn't contain required parameters");
        return;
    }

    let userId = request.body.userId;
    let firstName = request.body.firstName;
    let lastName = request.body.lastName;
    let middleName = request.body.middleName;
    let homeAddress = request.body.homeAddress;

    let street = homeAddress.street;
    let city = homeAddress.city;
    let province = homeAddress.province;
    let postalCode = homeAddress.postalCode;
    let country = homeAddress.country;

    getConnection((err, con) => {
        if (err) {
            response.status(500);
            response.send("Server couldn't connect to the database");
            return;
        }

        // check if the given userId exists
        con.query("SELECT * FROM Staff WHERE userId=?", [userId], (err, result) => {
            if (err) {
                throw err;
            }

            if (result.length === 0) {
                response.status(404);
                response.send("Staff not found with the given userId \"" + userId + "\"");
                return;
            }

            let sql = "UPDATE Staff SET firstName=" + escape(firstName) + ", lastName=" + escape(lastName);

            if (middleName !== undefined) {
                sql += ", middleName=" + escape(middleName);
            }

            sql += " WHERE userId=" + escape(userId);

            sql += ";UPDATE Address SET street=" + escape(street) + ", city=" + escape(city) + ", province=" +
                escape(province) + ", postalCode=" + escape(postalCode) + ", country=" + escape(country) +
                "WHERE userId=" + escape(userId);

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

staffRouter.delete("/", (request, response) => {
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
        con.query("SELECT * FROM Staff WHERE userId=?", [userId], (err, result) => {
            if (err) {
                throw err;
            }

            if (result.length === 0) {
                response.status(404);
                response.send("Staff not found with the given userId \"" + userId + "\"");
                return;
            }

            let sql = "DELETE FROM Staff WHERE userId=" + escape(userId);
            sql += ";DELETE FROM Address WHERE userId=" + escape(userId);
            sql += ";DELETE FROM AccountType WHERE userId=" + escape(userId);

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
    staffRouter,
};
