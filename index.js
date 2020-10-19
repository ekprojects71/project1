//node packages
const express = require("express");
require("dotenv").config();
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const pool = require("./DB/index");
//no bycrypt since user registration will not be implemented until i remake this app


//express app setup
const app = express();

app.set("view-engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


//session middleware setup
app.use(session({
    name: "Session",
    secret: "demo-app-secret",
    resave: false,
    saveUninitialized: false,
    store: new pgSession({
        pool: pool
    }),
    cookie: {
        path: "/",
        maxAge: 1000 * 60 * 20, //log out after 20 mins idle
        httpOnly: true,
        secure: false,
        sameSite: true,
    }
}));


//Redirect Middleware
const redirectLogin = (req, res, next) => {
    if(!req.session.user) {
        res.redirect("/");
    }
    else {
        next();
    }
};

const redirectDashboard = (req, res, next) => {
    if(req.session.user) {
        res.redirect("/app");
    }
    else {
        next();
    }
};



//API and Auth routes
app.use("/api", require("./routes/api"));
app.use("/auth", require("./auth/auth"));


//routes used for navigation
app.get("/", redirectDashboard, (request, response) => {
        response.render("login.ejs");
});

app.get("/app", redirectLogin, (request, response) => {
    response.render("app.ejs");
});

//catch-all route
app.get("*", (request, response) => {
    response.redirect("/");
});

//default port = 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port: ${port}`));