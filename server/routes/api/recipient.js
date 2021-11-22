const { Router } = require("express");
const {escape, getPool} = require("../../mysqlLib");

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

/**
 * Check if the given recipient user exists
 * @param recipientUserId The user id to check
 * @return true if the recipient exists, false otherwise
 */
async function checkIfRecipientExists(recipientUserId) {
    let pool = await getPool;
    let result = await pool.query("SELECT * FROM Recipient WHERE userId=?", [recipientUserId]);
    return result.length !== 0;
}

recipientRouter.get("/", (request, response) => {
    let customerUserId = request.query.customerUserId;
    let recipientUserId = request.query.recipientUserId;

    let sql = "SELECT * FROM Recipient INNER JOIN Address ON Recipient.userId=Address.userId ";

    // if both are given, ignore recipientUserId
    if (customerUserId !== undefined && recipientUserId !== undefined) {
        recipientUserId = undefined;
    }

    if (customerUserId !== undefined) {
        sql += "INNER JOIN Donation ON Donation.recipientUserId=Recipient.userId WHERE Donation.customerUserId=" +
            escape(customerUserId);
    } else if (recipientUserId !== undefined) {
        sql += "WHERE Recipient.userId=" + escape(recipientUserId);
    }

    getPool.then(pool => {
        pool.query(sql).then(result => {
            if (recipientUserId !== undefined && customerUserId === undefined && result.length === 0) {
                response
                    .status(404)
                    .send("Recipient not found with the given recipientUserId \"" + recipientUserId + "\"");
                return;
            }

            // convert the result to json format
            let newResult = JSON.parse(JSON.stringify(result));

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
    }).catch(() => response.status(500).send("Server couldn't connect to the database"));
});

recipientRouter.post("/", (request, response) => {
    if (!isValidBody(request.body)) {
        response.status(400).send("Request body doesn't contain required parameters");
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
        response.status(400).send("The format of the given birthDate is invalid");
        return;
    }

    checkIfRecipientExists(userId).then(exist => {
        if (exist) {
            response.status(409).send("userId \"" + userId + "\" already in use");
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

        getPool.then(pool => {
            pool.query(sql).then(() => response.status(201).send("Created"));
        });
    }).catch(() => response.status(500).send("Server couldn't connect to the database"));
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
        response.status(400).send("The format of the given birthDate is invalid");
        return;
    }

    checkIfRecipientExists(userId).then(exist => {
        if (!exist) {
            response.status(404).send("Recipient not found with the given userId \"" + userId + "\"");
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

        getPool.then(pool => {
            pool.query(sql).then(() => response.status(200).send("Updated"));
        });
    }).catch(() => response.status(500).send("Server couldn't connect to the database"));
});

recipientRouter.delete("/", (request, response) => {
    let userId = request.query.userId;
    if (userId === undefined) {
        response.status(400).send("Parameter userId is missing");
        return;
    }

    checkIfRecipientExists(userId).then(exist => {
        if (!exist) {
            response.status(404).send("Recipient not found with the given userId \"" + userId + "\"");
            return;
        }

        let sql = "DELETE FROM Recipient WHERE userId=" + escape(userId);
        sql += ";DELETE FROM Address WHERE userId=" + escape(userId);
        sql += ";DELETE FROM AccountType WHERE userId=" + escape(userId);
        sql += ";DELETE FROM Donation WHERE recipientUserId=" + escape(userId);
        sql += ";DELETE FROM Transaction WHERE recipientUserId=" + escape(userId);

        getPool.then(pool => {
            pool.query(sql).then(() => response.status(200).send("Deleted"));
        });
    }).catch(() => response.status(500).send("Server couldn't connect to the database"));
});

module.exports = {
    recipientRouter,
    checkIfRecipientExists: checkIfRecipientExists
};
