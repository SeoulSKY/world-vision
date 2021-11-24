const { Router } = require("express");
const { getPool, escape } = require("../../mysqlLib");

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
        body.homeAddress.buildingNumber !== undefined &&
        body.homeAddress.street !== undefined &&
        body.homeAddress.city !== undefined &&
        body.homeAddress.province !== undefined &&
        body.homeAddress.postalCode !== undefined &&
        body.homeAddress.country !== undefined
}

/**
 * Check if the given staff id is valid
 * @param staffUserId The user id to check
 * @return true if the staff exists, false otherwise
 */
async function checkIfStaffExists(staffUserId) {
    let pool = await getPool;
    let result = await pool.query("SELECT * FROM Staff WHERE userId=?", [staffUserId]);
    return result.length !== 0;
}

staffRouter.get("/", (request, response) => {
    let sql = "SELECT * FROM Staff INNER JOIN Address ON Staff.userId=Address.userId";

    let userId = request.query.userId;
    if (userId !== undefined) {
        sql += " WHERE Staff.userId=" + escape(userId);
    }

    checkIfStaffExists(userId).then(exist => {
        if (userId !== undefined && !exist) {
            response.status(404).send("Staff not found with the given userId \"" + userId + "\"");
            return;
        }

        getPool.then(pool => {
            pool.query(sql).then(result => {
                // convert the result to json format
                let newResult = JSON.parse(JSON.stringify(result));

                let array = [];
                for (let i = 0; i < newResult.length; i++) {
                    let json = {
                        userId: newResult[i].userId,
                        firstName: newResult[i].firstName,
                        lastName: newResult[i].lastName,
                        homeAddress: {
                            buildingNumber: newResult[i].buildingNumber,
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
    }).catch(() => {
        response.status(500).send("Server couldn't connect to the database");
    });
});

staffRouter.post("/", (request, response) => {
    if (!isValidBody(request.body)) {
        response.status(400).send("Request body doesn't contain required parameters");
        return;
    }

    let userId = request.body.userId;
    let firstName = request.body.firstName;
    let lastName = request.body.lastName;
    let middleName = request.body.middleName;
    let homeAddress = request.body.homeAddress;

    let buildingNumber = homeAddress.buildingNumber;
    let street = homeAddress.street;
    let city = homeAddress.city;
    let province = homeAddress.province;
    let postalCode = homeAddress.postalCode;
    let country = homeAddress.country;

    checkIfStaffExists(userId).then(exist => {
        if (exist) {
            response.status(409).send("userId \"" + userId + "\" already in use");
            return;
        }

        let sql = "INSERT INTO Staff (userId, firstName, lastName";
        if (middleName === undefined) {
            sql += ") VALUES (" + escape(userId) + ", " + escape(firstName) + ", " + escape(lastName) + ")";
        } else {
            sql += ", middleName) VALUES (" + escape(userId) + ", " + escape(firstName) + ", " +
                escape(lastName) + ", " + escape(middleName) + ")";
        }

        sql += ";INSERT INTO Address (userId, buildingNumber, street, city, province, postalCode, country) VALUES (" +
            escape(userId) + ", " + escape(buildingNumber) + ", " + escape(street) + ", " + escape(city) + ", " + escape(province) + ", " +
            escape(postalCode) + ", " + escape(country) + ")";

        sql += ";INSERT INTO AccountType (userId, type) VALUES (" + escape(userId) + ", \"Staff\")";

        getPool.then(pool => {
            pool.query(sql).then(() => response.status(201).send("Created"));
        });
    }).catch(() => {
        response.status(500).send("Server couldn't connect to the database");
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

    let buildingNumber = homeAddress.buildingNumber;
    let street = homeAddress.street;
    let city = homeAddress.city;
    let province = homeAddress.province;
    let postalCode = homeAddress.postalCode;
    let country = homeAddress.country;

    checkIfStaffExists(userId).then(exist => {
        if (!exist) {
            response.status(404).send("Staff not found with the given userId \"" + userId + "\"");
            return;
        }

        let sql = "UPDATE Staff SET firstName=" + escape(firstName) + ", lastName=" + escape(lastName);

        if (middleName !== undefined) {
            sql += ", middleName=" + escape(middleName);
        }

        sql += " WHERE userId=" + escape(userId);

        sql += ";UPDATE Address SET buildingNumber=" + escape(buildingNumber) + ", street=" + escape(street) +
            ", city=" + escape(city) + ", province=" + escape(province) + ", postalCode=" + escape(postalCode) +
            ", country=" + escape(country) + "WHERE userId=" + escape(userId);

        getPool.then(pool => {
            pool.query(sql).then(() => response.status(200).send("Updated"));
        });
    }).catch(() => {
        response.status(500).send("Server couldn't connect to the database\"");
    });
});

staffRouter.delete("/", (request, response) => {
    let userId = request.query.userId;
    if (userId === undefined) {
        response.status(400);
        response.send("Parameter userId is missing");
        return;
    }

    checkIfStaffExists(userId).then(exist => {
        if (!exist) {
            response.status(404).send("Staff not found with the given userId \"" + userId + "\"");
            return;
        }

        let sql = "DELETE FROM Staff WHERE userId=" + escape(userId);
        sql += ";DELETE FROM Address WHERE userId=" + escape(userId);
        sql += ";DELETE FROM AccountType WHERE userId=" + escape(userId);

        getPool.then(pool => {
            pool.query(sql).then(() => response.status(200).send("Deleted"));
        });
    }).catch(() => {
        response.status(500).send("Server couldn't connect to the database\"");
    });
});

module.exports = {
    staffRouter,
    checkIfStaffExists: checkIfStaffExists
};
