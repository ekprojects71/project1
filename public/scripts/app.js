//DOM queries
const userActionsBtn = document.querySelector(".user-actions");
const userActionsMenu = document.querySelector(".userActionsDropdown");

const bugSubmitBtn = document.querySelector(".bug-submit");

const adminOptions = document.querySelector(".admin");
const viewProjects = document.querySelector(".view-projects-admin");
const viewTickets = document.querySelector(".view-tickets-admin");
const devFilter = document.getElementById("dev-filter");

const bugCards = document.querySelector(".bug-cards-container");
const searchField = document.getElementById("bug-search");
const myTickets = document.getElementById("my-bugs");
const projectFilter = document.getElementById("project");
const statusFilter = document.getElementById("status");


//function calls - MAIN
console.log(moment.unix(Date.now()/1000).format('MMMM Do YYYY, h:mm a'));
//build user actions menu(user profile)
createUserProfile();

//build the initial dashboard
buildDashboard();


//Dashboard Functions

// search field filter
function filterTickets(term) {
    const cards = Array.from(bugCards.children);

    //filter out invalid cards
    cards.filter((card) => {
        return !(card.querySelector(".bug-title").innerText.toLowerCase().includes(term));
    })
    .forEach((card) => {
        card.classList.add("d-none");
    });

    //remove filters when erasing search
    cards.filter((card) => {
        return (card.querySelector(".bug-title").innerText.toLowerCase().includes(term));
    })
    .forEach((card) => {
        card.classList.remove("d-none");
    });
}

// status dropdown filter
function filterByStatus(status) {
    const cards = Array.from(bugCards.children);

    cards.forEach((card) => {
        card.classList.remove("d-none");
    });

    if(status != "all") {
        //filter out invalid cards
        cards.filter((card) => {
            return !(card.querySelector(".status").getAttribute("data-id") == status);
        })
        .forEach((card) => {
            card.classList.add("d-none");
        });
    }
    else {
        //remove filters when erasing search
        cards.forEach((card) => {
            card.classList.remove("d-none");
        });
    }
}
// project dropdown filter
function filterByProject(id) {
    const cards = Array.from(bugCards.children);

    cards.forEach((card) => {
        card.classList.remove("d-none");
    });

    if(id != "all" && id != "unassigned") {
        //filter out invalid cards
        cards.filter((card) => {
            return !(card.querySelector(".bug-project").getAttribute("data-id") == id);
        })
        .forEach((card) => {
            card.classList.add("d-none");
        });
    }
    else if(id == "unassigned") {
        cards.filter((card) => {
            return !(card.querySelector(".bug-project").getAttribute("data-id") == "unassigned");
        })
        .forEach((card) => {
            card.classList.add("d-none");
        });
    }
    else {
        //remove filters when erasing search
        cards.forEach((card) => {
            card.classList.remove("d-none");
        });
    }
}
// developer dropdown filter
function filterByDev(dev) {
    const cards = Array.from(bugCards.children);

    cards.forEach((card) => {
        card.classList.remove("d-none");
    });

    if(dev != "all" && dev != "unassigned") {
        //filter out invalid cards
        cards.filter((card) => {
            return !(card.querySelector(".bug-assigned").getAttribute("data-id") == dev);
        })
        .forEach((card) => {
            card.classList.add("d-none");
        });
    }
    else if(dev == "unassigned") {
        cards.filter((card) => {
            return !(card.querySelector(".bug-assigned").getAttribute("data-id") == "unassigned");
        })
        .forEach((card) => {
            card.classList.add("d-none");
        });
    }
    else {
        //remove filters when erasing search
        cards.forEach((card) => {
            card.classList.remove("d-none");
        });
    }
}
// assigned to me filter
function filterByAssigned(id) {
    const cards = Array.from(bugCards.children);
    const isChecked = myTickets.checked;

    if(isChecked) {
        //filter out invalid cards
        cards.filter((card) => {
            return !(card.querySelector(".bug-assigned").getAttribute("data-id") == id ||
                     card.querySelector(".bug-submitter").getAttribute("data-id") == id);
        })
        .forEach((card) => {
            card.classList.add("d-none");
        });
    }
    else {
        //remove filters when erasing search
        cards.forEach((card) => {
            card.classList.remove("d-none");
        });
    }
}



// ---- Event Listeners ----

//NAVBAR
//user actions dropdown menu
userActionsBtn.addEventListener("click", (e) => {

    userActionsMenu.classList.toggle("d-none");
});

userActionsMenu.addEventListener("submit", (e) => {
    e.preventDefault();
    //LOGOUT
    logout()
        .then(() => {
            location.reload();
        })
        .catch((error) => {
            console.log(error);
            location.reload();
        });
})

//DASHBOARD
//search field
searchField.addEventListener("keyup", (e) => {
    let term = searchField.value.trim().toLowerCase();
    filterTickets(term);
});

//filter by my tickets
myTickets.addEventListener("change", (e) => {
    filterByAssigned(sessionUser.user_id);
});

//filter by status
statusFilter.addEventListener("change", (e) => {
    filterByStatus(statusFilter.value);
});

//filter by project
projectFilter.addEventListener("change", (e) => {
    filterByProject(projectFilter.value);
});

//filter by developer -- admin
devFilter.addEventListener("change", (e) => {
    filterByDev(devFilter.value);
});


//MODALS
//bug submission window -- every user
bugSubmitBtn.addEventListener("click", (e) => {
    drawBugSubmitForm();
});


//view projects window  -- admin
viewProjects.addEventListener("click", (e) => {
    e.preventDefault();

    let projectsList = "";
    
    projects.forEach((project) => {
        projectsList+= addProjectLI(project.project_title, project.project_id);
    });
    
    drawProjectList(projectsList);
    drawProjectsWindow();
});

//view ticket history window  -- admin
viewTickets.addEventListener("click", (e) => {
    e.preventDefault();

    let ticketsList = "";

    bugs.forEach((bug) => {
        ticketsList += addTicketToList(bug.bug_title, 
            moment.unix(bug.last_updated/1000).format('MM/DD/YYYY, h:mm a'));
    });

    createTicketHistory(ticketsList);
    drawTicketHistory();
});



//BUG TICKET CARDS
//view bug window, edit bug window  -- bug tickets
bugCards.addEventListener("click", (e) => {
    let currentBugCard = null;
    if(e.target.tagName == "BUTTON") {
        currentBugCard = e.target.parentNode.parentNode;

        let id = currentBugCard.getAttribute("data-id"),
                status = currentBugCard.querySelector(".status").innerText, 
                title = currentBugCard.querySelector(".bug-title").innerText,
                description = currentBugCard.querySelector(".bug-description").innerText, 
                submitter = currentBugCard.querySelector(".bug-submitter").innerText, 
                developer = currentBugCard.querySelector(".bug-assigned").innerText, 
                project = currentBugCard.querySelector(".bug-project").innerText,
                lastUpdated = currentBugCard.querySelector(".bug-time").innerText;


        //opens the view bug window
        if(e.target.classList.contains("view-bug-btn")) {
            createViewBugWindow(status, title, description, submitter, 
                                developer, project, lastUpdated);
            openViewBugWindow();
        }


        

        //opens the edit bug window
        if(e.target.classList.contains("edit-bug-btn")) {

            status = currentBugCard.querySelector(".status").getAttribute("data-id");
            if(project != "unassigned") {
               project = currentBugCard.querySelector(".bug-project").getAttribute("data-id");
            }
            if(developer != "unassigned") {
                developer = currentBugCard.querySelector(".bug-assigned").getAttribute("data-id");
            }

            let projList = "";
            let devList = "";

            projects.forEach((project) => {
                projList += `
                <option value="${project.project_id}">${project.project_title}</option>`;
            });

            users.forEach((user) => {
                if(user.status == 2 || user.status == 3) {
                    devList += `
                    <option value="${user.user_id}">${user.first_name} ${user.last_name}</option>`;
                }
            });

            createEditBugWindow(id, status, title, description, developer, project, devList, projList);
            openEditBugWindow();
        }
    }
});