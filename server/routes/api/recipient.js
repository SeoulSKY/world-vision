const { Router } = require("express");
const {escape, getConnection} = require("../../mysqlLib");

const recipientRouter = Router();

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
        body.homeAddress.country !== undefined &&
        body.birthDate !== undefined &&
        body.gender !== undefined &&
        body.description !== undefined;
}

recipientRouter.get("/", (request, response) => {
    let sql = "SELECT * FROM Recipient INNER JOIN Address ON Recipient.userId=Address.userId";

    let userId = request.query.userId;
    if (userId !== undefined) {
        sql += " WHERE Recipient.userId=" + escape(userId);
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
                response.send("Recipient not found with the given userId \"" + userId + "\"");
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
                    },
                    birthDate: newResult[i].birthDate,
                    gender: newResult[i].gender,
                    description: newResult[i].description
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

recipientRouter.post("/", (request, response) => {
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

    let birthDate = request.body.birthDate;
    let gender = request.body.gender;
    let description = request.body.description;

    if (new Date(birthDate).toString() === "Invalid Date") {
        response.status(400);
        response.send("The format of the given birthDate is invalid");
        return;
    }

    getConnection((err, con) => {
        if (err) {
            response.status(500);
            response.send("Server couldn't connect to the database");
            return;
        }

        con.query("SELECT * FROM Recipient WHERE userId=?", [userId], (err, result) => {
            if (err) {
                throw err;
            }

            // check if the userId is already in use
            if (result.length !== 0) {
                response.status(409);
                response.send("userId \"" + userId + "\" already in use");
                return;
            }

            let sql = "INSERT INTO Recipient (userId, firstName, lastName, birthDate, gender, description";
            if (middleName === undefined) {
                sql += ") VALUES (" + escape(userId) + ", " + escape(firstName) + ", " + escape(lastName) + ", " +
                    escape(birthDate) + ", " + escape(gender) + ", " + escape(description) + ")";
            } else {
                sql += ", middleName) VALUES (" + escape(userId) + ", " + escape(firstName) + ", " +
                    escape(lastName) + ", " +  escape(birthDate) + ", " + escape(gender) + ", " + escape(description) +
                    ", " + escape(middleName) + ")";
            }

            sql += ";INSERT INTO Address (userId, street, city, province, postalCode, country) VALUES (" +
                escape(userId) + ", " + escape(street) + ", " + escape(city) + ", " + escape(province) + ", " +
                escape(postalCode) + ", " + escape(country) + ")";

            sql += ";INSERT INTO AccountType (userId, type) VALUES (" + escape(userId) + ", \"Recipient\")";

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

recipientRouter.put("/", (request, response) => {
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

    let birthDate = request.body.birthDate;
    let gender = request.body.gender;
    let description = request.body.description;

    if (new Date(birthDate).toString() === "Invalid Date") {
        response.status(400);
        response.send("The format of the given birthDate is invalid");
        return;
    }

    getConnection((err, con) => {
        if (err) {
            response.status(500);
            response.send("Server couldn't connect to the database");
            return;
        }

        con.query("SELECT * FROM Recipient WHERE userId=?", [userId], (err, result) => {
            if (err) {
                throw err;
            }

            // check if the given userId exists
            if (result.length === 0) {
                response.status(404);
                response.send("Recipient not found with the given userId \"" + userId + "\"");
                return;
            }

            let sql = "UPDATE Recipient SET firstName=" + escape(firstName) + ", lastName=" + escape(lastName) +
                ", birthDate=" + escape(birthDate) + ", gender=" + escape(gender) + ", description=" + escape(description);

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

recipientRouter.delete("/", (request, response) => {
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

        con.query("SELECT * FROM Recipient WHERE userId=?", [userId], (err, result) => {
            if (err) {
                throw err;
            }

            // check if the given userId exists
            if (result.length === 0) {
                response.status(404);
                response.send("Recipient not found with the given userId \"" + userId + "\"");
                return;
            }

            let sql = "DELETE FROM Recipient WHERE userId=" + escape(userId);
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
    recipientRouter,
};