const dbCompany = document.querySelector(".company-name");
const dbTotalTickets = document.querySelector(".num-tickets");
const dbProjectsList = document.querySelector("#project");
const dbAdminPanel = document.querySelector(".admin");
const dbDevsList = document.querySelector("#dev-filter");
const dbBugCards = document.querySelector(".bug-cards-container");

//*call in app, and when dashboard is changed*
async function buildDashboard() {
    const data = await retrieveAppData();

    companyName = data[0];
    users = data[1];
    bugs = data[2];
    projects = data[3];
    //console.log(companyName);
    //console.table(users);
    //console.table(bugs);
    //console.table(projects);

    bugs.sort((a, b) => {
        return b.last_updated - a.last_updated;
    })

    dbCompany.innerText = companyName;
    dbTotalTickets.innerText = bugs.length;
    if(sessionUser.status === 3) {
        dbAdminPanel.classList.remove("d-none");
    }
    populateProjects();
    populateDevs();
    buildBugTickets(bugs, projects, users);
}


function populateProjects() {
    dbProjectsList.innerHTML = `
    <option value="all" selected>All</option>
    <option value="unassigned">Unassigned</option>`;

    projects.forEach((project) => {
        dbProjectsList.innerHTML += `
        <option value="${project.project_id}">${project.project_title}</option>`;
    });
}

function populateDevs() {
    dbDevsList.innerHTML = `
    <option value="all" selected>All</option>
    <option value="unassigned">Unassigned</option>`;

    users.forEach((user) => {
        if(user.status == 2 || user.status == 3) {
            dbDevsList.innerHTML += `
            <option value="${user.user_id}">${user.first_name} ${user.last_name}</option>`;
        }
    });
}

//functions for building each card of the bugs list
function getUserFullName(users, userID) {
    let fullname = "";
    if(userID != null)
    {
        users.forEach((user) => {
            if(user.user_id == userID) {
                fullname = `${user.first_name} ${user.last_name}`;
            }
        });
        return fullname;
    }
    else
    {
        return `unassigned`;
    }

}
function getProjectTitle(projects, projectID) {
    let title = "";
    if(projectID != null)
    {
        projects.forEach((project) => {
            
            if(project.project_id == projectID) {
                title = project.project_title;
            }
        });
        return title;
    }
    else
    {
        return `unassigned`;
    }
    
}

function buildBugTickets(bugs, projects, users) {
    
    dbBugCards.innerHTML = "";
    bugs.forEach((bug) => {
        drawBugCard(bug, getUserFullName(users, bug.developer), 
                    getUserFullName(users, bug.submitter), 
                    getProjectTitle(projects, bug.project));
    });
}
