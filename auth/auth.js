const express = require("express");
const router = express.Router();
const queries = require("../DB/queries");

//route path is /auth

router.post("/login", async (request, response) => {
    //console.log("Attempting to log in...");
    try {
        let user = {
            id: null,
            email: request.body.email,
            password: request.body.password,
            first_name: null,
            last_name: null,
            company: null,
            status: null
        };

        if(typeof user.email == "string" && user.email.trim() != "" &&
           typeof user.password == "string" && user.password.trim() != "") 
        {
            const userData = await queries.loginQuery(user.email, user.password);

            user.id = userData.user_id;
            user.company = userData.company_id;
            user.status = userData.status;
            user.first_name = userData.first_name;
            user.last_name = userData.last_name;
            
            request.session.loggedin = true;
            request.session.user = user;

            //console.table(request.session.user);

            response.redirect("/app").status(200);
            
        }
        else {
            response.status(400).send('Invalid Username or Password.');
        }
    }
    catch {
        response.status(400).send('Invalid Username or Password.');
    }
});

//logout, destroy session
router.get("/logout", (request, response) => {
    try{
        if(request.session.loggedin) {
            request.session.destroy((err) => {
                if(err) {
                    console.log(err);
                }
                else {
                    response.redirect("/login");
                }
            })
        }
        else {
            response.redirect("/login");
        }
    }
    catch{
        response.status(400).send("You are not logged in.");
    }
});

//get user data stored in session
router.get("/user", (request, response) => {
    try{
        if(request.session.user)
        {
            const data = { 
                user_id: request.session.user.id, 
                first_name: request.session.user.first_name, 
                last_name: request.session.user.last_name, 
                status: request.session.user.status, 
                company: request.session.user.company 
            };

            response.status(200).json(data);
        }
        else {
            response.status(400).send("You must log in first.");
        }
    }
    catch{
        response.status(400).send("You must log in first.");
    }
});

//export
module.exports = router;