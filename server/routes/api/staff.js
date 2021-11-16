const { Router } = require("express");
const { getConnection, escape } = require("../../mysqlLib");

const staffRouter = Router();

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

            if (newResult.length === 0) {
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
    getConnection((err, con) => {

    })

   response.send("Hello from staff POST");
});

staffRouter.put("/", (request, response) => {
    response.send("Hello from staff PUT");
});

staffRouter.delete("/", (request, response) => {
    response.send("Hello from staff DELETE");
});

module.exports = {
    staffRouter,
};
