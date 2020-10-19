//node packages
const express = require("express");
require("dotenv").config();
const session = require("express-session");
const PGstore = require("connect-pg-simple")(session);
const pool = require("./DB/index");


//express app setup
const app = express();

app.set("view-engine", "ejs");
app.use(express.json({limit: "1mb"}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//setting up login session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    store: new PGstore({
        pool: pool
    }),
    cookie: {
        secure: true,
        httpOnly: true,
        sameSite: true,
        maxAge: 1000 * 60 * 15
    }
}));

//initialize routes
app.use("/api", require("./routes/api"));
app.use("/auth", require("./auth/auth"));


//routes used for navigation
app.get("/", (request, response) => {
    if(request.session.user)
    {
        if(request.session.loggedin)
        {
            response.render("app.ejs");
            //console.table(request.session.user);
            //console.log(request.session.loggedin);
        }
        else
        {
            response.render("login.ejs");
        }
    }
    else
    {
        response.render("login.ejs");
    }
});

app.get("/login", (request, response) => {
    if(request.session.user)
    {
        if(request.session.loggedin)
        {
            response.render("app.ejs");
        }
        else
        {
            response.render("login.ejs");
        }
    }
    else
    {
        response.render("login.ejs");
    }
});

app.get("/app", (request, response) => {
    if(request.session.user)
    {
        if(request.session.loggedin)
        {
            response.render("app.ejs");
        }
        else
        {
            response.render("login.ejs");
        }
    }
    else
    {
        response.render("login.ejs");
    }
});

//404 route
app.get("*", (request, response) => {
    if(request.session.user)
    {
        if(request.session.loggedin)
        {
            response.render("app.ejs");
        }
        else
        {
            response.render("login.ejs");
        }
    }
    else
    {
        response.render("login.ejs");
    }
});

//default port = 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running at port: ${port}`));