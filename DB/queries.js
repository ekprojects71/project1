const db = require("./index");


//login queries - used by Auth
async function loginQuery(email, password) {
    try {
        const query = "SELECT USER_ID, FIRST_NAME, LAST_NAME, STATUS, COMPANY_ID FROM USERS WHERE EMAIL = $1 AND PASSWORD = $2";
        const values = [email, password];
       
        const results = await db.query(query, values);
        const user = await results.rows;

        return user[0];
   }
   catch(error) {
       console.log(error);
       throw error;
   }
}


//Dashboard data queries - used by the API

//SELECT
async function getCompany(companyID) {
    try{
        const query = "SELECT COMPANY_NAME FROM COMPANY WHERE COMPANY_ID = $1";
        const values = [companyID];
        
        const results = await db.query(query, values);
        const data = await results.rows; 

        return data[0].company_name;    //return the value of the field directly
    }
    catch(error)
    {
        console.log(error);
        throw error;
    }
}

async function getUsers(companyID) {
    try{
        const query = "SELECT USER_ID, FIRST_NAME, LAST_NAME, STATUS FROM USERS WHERE COMPANY_ID = $1 AND STATUS > $2";
        const values = [companyID, "0"];

        const results = await db.query(query, values);
        const data = await results.rows;

        return data;
    }
    catch(error)
    {
        console.log(error);
        throw error;
    }
}

async function getBugs(companyID) {
    try{
        const query = `SELECT BUG_ID, BUG_TITLE, BUG_STATUS, BUG_DESCRIPTION, SUBMITTER, DEVELOPER, PROJECT, LAST_UPDATED 
                    FROM BUGS WHERE COMPANY = $1`;
        const values = [companyID];

        const results = await db.query(query, values);
        const data = await results.rows
        
        return data;
    }
    catch(error)
    {
        console.log(error);
        throw error;
    }
}

async function getProjects(companyID) {
    try{
        const query = "SELECT PROJECT_ID, PROJECT_TITLE FROM PROJECTS WHERE COMPANY_ID = $1";
        const values = [companyID];
        
        const results = await db.query(query, values);
        const data = await results.rows;

        return data;
    }
    catch(error)
    {
        console.log(error);
        throw error;
    }
}

//INSERT
function addProject(project) {
    try {
        const query = `INSERT INTO PROJECTS(PROJECT_TITLE, COMPANY_ID) VALUES 
                        ($1, $2)`;
        const values = [project.project_title, project.company_id];

        db.query(query, values);
    } 
    catch(error) {
        console.log(error);
        throw error;
    }
}

function addBug(bug) {
    try {
        const query = `INSERT INTO BUGS(BUG_TITLE, BUG_STATUS, BUG_DESCRIPTION, SUBMITTER,
                                        DEVELOPER, PROJECT, COMPANY, LAST_UPDATED) 
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
        const values = [bug.bug_title, bug.bug_status, bug.bug_description, bug.submitter,
                        bug.developer, bug.project, bug.company, bug.last_updated];

        db.query(query, values);
    } 
    catch(error) {
        console.log(error);
        throw error;
    }
}

//UPDATE
function updateProject(project) {
    try {
        const query = `UPDATE PROJECTS
                        SET PROJECT_TITLE = $1 
                        WHERE PROJECT_ID = $2`;
        const values = [project.project_title, project.project_id];

        db.query(query, values);
    } 
    catch(error) {
        console.log(error);
        throw error;
    }
}

function updateBug(bug) {
    try {
        const query = `UPDATE BUGS
                        SET BUG_TITLE = $1, BUG_STATUS = $2, BUG_DESCRIPTION = $3,
                                        DEVELOPER = $4, PROJECT = $5, LAST_UPDATED = $6 
                        WHERE BUG_ID = $7`;
        const values = [bug.bug_title, bug.bug_status, bug.bug_description, bug.developer, 
                        bug.project, bug.last_updated, bug.bug_id];

        db.query(query, values);
    } 
    catch(error) {
        console.log(error);
        throw error;
    }
}

//DELETE
function deleteProject(projectID) {
    try {
        const query = `DELETE FROM PROJECTS 
                        WHERE PROJECT_ID = $1`;
        const values = [projectID];

        db.query(query, values);
    } 
    catch(error) {
        console.log(error);
        throw error;
    }
}

function deleteBug(bugID) {
    try {
        const query = `DELETE FROM BUGS
                        WHERE BUG_ID = $1`;
        const values = [bugID];

        db.query(query, values);
    } 
    catch(error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    loginQuery: loginQuery,
    getCompany: getCompany,
    getUsers: getUsers,
    getBugs: getBugs,
    getProjects: getProjects,
    addProject: addProject,
    addBug: addBug,
    updateProject: updateProject,
    updateBug: updateBug,
    deleteProject: deleteProject,
    deleteBug: deleteBug
};