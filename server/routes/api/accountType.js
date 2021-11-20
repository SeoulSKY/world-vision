const { Router } = require("express");
const {getPool} = require("../../mysqlLib");

const accountTypeRouter = Router()

accountTypeRouter.get("/", (request, response) => {
    let userId = request.query.userId;

    if (userId === undefined) {
        response.status(400).send("Missing userId as a parameter");
        return;
    }
    
    getPool.then(pool => {
        pool.query("SELECT * FROM AccountType WHERE userId=?", [userId]).then(result => {
           if (result.length === 0) {
               response.status(404).send("userId \"" + userId + "\" not found in the database");
               return;
           }

           let newResult = JSON.parse(JSON.stringify(result));
           console.log(newResult);
           response.status(200).send(newResult[0].type);
        });
        
    }).catch(() => response.status(500).send("Server couldn't connect to the database"));
});

module.exports = {
    accountTypeRouter
}