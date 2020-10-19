const express = require("express");
const router = express.Router();
const queries = require("../DB/queries");

//api path is /api

router.get("/", (request, response) => {
    response.send("This is the root endpoint for the API");
});

//sends relevant data to the user's dashboard
router.get("/dashboard", async (request, response) => {
    try {
        const companyID = request.session.user.company;

        const company = await queries.getCompany(companyID);
        const employees = await queries.getUsers(companyID);
        const bugs = await queries.getBugs(companyID);
        const projects = await queries.getProjects(companyID);

        const data = [company, employees, bugs, projects];

        response.status(200).json(data);
    }
    catch {
        response.status(422).send("Invalid query, could not retrieve data.");
    }
});


//post requests for adding new records
router.post("/projects", (request,response) => {
    try {
        let project = request.body;
        project.company_id = request.session.user.company;

        if(request.session.user.status == 3) {

            queries.addProject(project);

            response.status(200).send("Project was successfully added.");
        }
        else {
            response.status(403).send("You lack the credentials to perform this action.");
        }
        
    }
    catch {
        response.status(422).send("Could not add project due to invalid query.");
    }
});

router.post("/bugs", (request,response) => {
    try {
        let bug = request.body;
        
        if(request.session.user) {
            bug.company = request.session.user.company;

            queries.addBug(bug);

            response.status(200).send("Bug was successfully added.");
        }
        else {
            response.status(403).send("You must be logged in to submit a bug.");
        }
    }
    catch {
        response.status(422).send("Could not add bug due to invalid query.");
    }
});


//put requests for updating existing records
router.put("/projects", (request, response) => {
    try {
        const project = request.body;

        if(request.session.user.status == 3) {

            queries.updateProject(project);

            response.status(200).send("Project was successfully updated.");
        }
        else {
            response.status(403).send("You lack the credentials to perform this action.");
        }
    }
    catch {
        response.status(422).send("Could not update project due to invalid query.");
    }
});

router.put("/bugs", (request, response) => {
    try {
        const bug = request.body;

        if(request.session.user.status == 3 || 
           request.session.user.id == bug.developer) {

            queries.updateBug(bug);

            response.status(200).send("Bug was successfully updated.");
        }
        else {
            response.status(403).send("You lack the credentials to perform this action.");
        }
    }
    catch {
        response.status(422).send("Could not update bug due to invalid query.");
    }
});


//delete requests for deleting existing records
router.delete("/projects/:project", (request, response) => {
    try {
        const projectID = request.params.project;

        if(request.session.user.status == 3) {

            queries.deleteProject(projectID);

            response.status(200).send("Project was successfully deleted.");
        }
        else {
            response.status(403).send("You lack the credentials to perform this action.");
        }
        
    }
    catch {
        response.status(422).send("Could not delete project due to invalid query.");
    }
});

router.delete("/bugs/:bug", (request, response) => {
    try {
        const bugID = request.params.bug;

        if(request.session.user.status == 3) {

            queries.deleteBug(bugID);

            response.status(200).send("Bug was successfully deleted.");
        }
        else {
            response.status(403).send("You lack the credentials to perform this action.");
        }
    }
    catch {
        response.status(422).send("Could not delete bug due to invalid query.");
    }
});


//export router
module.exports = router;