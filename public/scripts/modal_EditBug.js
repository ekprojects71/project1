//DOM Queries
const editBugWindow = document.querySelector(".edit-bug-window");

//Draw to DOM
function createEditBugWindow(id, status, title, description, 
                            developerID, projectID, devsList, projList) 
{
    let statusValue = status.toLowerCase();
    
    let canView = sessionUser.status == 3;
    let hide = "";
    if(!canView) {
        hide = "d-none";
    }

    editBugWindow.innerHTML = `
    <button class="edit-bug-exit">X</button>
        <form id="edit-bug-form" data-id="${id}"></form>
        <div class="edit-bug-title">
            <span>Edit Bug</span>
            <span class="${hide}">Title</span>
            <input type="text" placeholder="Bug Title" value="${title}" id="bug-submit-title-value"
             form="edit-bug-form" maxlength=100 class="${hide}" required>
            <p class="edit-bug-title-charlimit ${hide}"><span class="edit-bug-title-climit">100</span> Characters Remaining</p>
        </div>
        <div class="edit-bug-status">
            <span>Status</span>
            <select id="edit-bug-status-value" form="edit-bug-form">
                <option value="0">New</option>
                <option value="1">Minor</option>
                <option value="2">Major</option>
                <option value="3">Severe</option>
                <option value="4">Solved</option>
            </select>
        </div>
        <div class="edit-bug-descrip">
            <p>Description</p>
            <textarea name="edit-bug-descrip-value" id="bug-submit-descrip-value" 
            placeholder="Bug description..." form="edit-bug-form" maxlength=500 required></textarea>
            <p class="edit-bug-descrip-charlimit"><span class="edit-bug-descrip-climit">500</span> Characters Remaining</p>
        </div>
        <div class="edit-bug-dev ${hide}">
            <span>Developer</span>
            <select id="edit-bug-dev-value">
                <option value="unassigned">Unassigned</option>
                ${devsList}
            </select>
        </div>
        <div class="edit-bug-project ${hide}">
            <span>Project</span>
            <select id="edit-bug-project-value">
                <option value="unassigned">Unassigned</option>
                ${projList}
            </select>
        </div>
        <div class="edit-bug-submit">
            <button class="edit-bug-submit-btn" form="edit-bug-form">Submit Changes</button>
            <button class="edit-bug-delete-btn ${hide}">Delete</button>
        </div>`;


        //sets appropriate value to each dropdown list
        const bugStatus = document.getElementById("edit-bug-status-value");
        const developer = document.getElementById("edit-bug-dev-value");
        const project = document.getElementById("edit-bug-project-value");

        bugStatus.value = statusValue;
        developer.value = developerID;
        project.value = projectID;

        //filling the textarea
        editBugWindow.querySelector("textarea").value = description;
}

//open, close the window
function openEditBugWindow() {
    editBugWindow.scrollIntoView();
    bckgTint.classList.toggle("d-none");
    bckgTint.style.zIndex = 2;
    editBugWindow.classList.toggle("d-none");

    let title = editBugWindow.querySelector("#bug-submit-title-value");
    let description = editBugWindow.querySelector("#bug-submit-descrip-value");
    let titleChars = editBugWindow.querySelector(".edit-bug-title-climit");
    let descripChars = editBugWindow.querySelector(".edit-bug-descrip-climit");

    titleChars.innerText = 100 - title.value.length;
    descripChars.innerText = 500 - description.value.length;
}

function closeEditBugWindow() {
    bckgTint.classList.toggle("d-none");
    editBugWindow.classList.toggle("d-none");
}

//event listeners
editBugWindow.addEventListener("click", (e) => {
    //close the window
    if(e.target == editBugWindow.querySelector(".edit-bug-exit")) {
        closeEditBugWindow();
    }

    //delete the bug, submit request to server
    if(e.target == editBugWindow.querySelector(".edit-bug-delete-btn")) {
        let id = editBugWindow.querySelector("#edit-bug-form").getAttribute("data-id");

        deleteBug(id)
            .then(() => {
                buildDashboard();
                closeEditBugWindow();
            })
            .catch((error) => {
                console.log(error);
            });
    }    
});

editBugWindow.addEventListener("keyup", (e) => {
    let title = editBugWindow.querySelector("#bug-submit-title-value");
    let description = editBugWindow.querySelector("#bug-submit-descrip-value");
    let titleChars = editBugWindow.querySelector(".edit-bug-title-climit");
    let descripChars = editBugWindow.querySelector(".edit-bug-descrip-climit");

    titleChars.innerText = 100 - title.value.length;
    descripChars.innerText = 500 - description.value.length;

    if (title.value.length >= 100) {
        title.value = title.value.substring(0, 100);
    }

    if (description.value.length >= 500) {
        description.value = description.value.substring(0, 500);
    } 
});

//submit the bug to the server
editBugWindow.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let id = editBugWindow.querySelector("#edit-bug-form").getAttribute("data-id");
    let title = editBugWindow.querySelector("#bug-submit-title-value").value;
    let description = editBugWindow.querySelector("#bug-submit-descrip-value").value;
    let status = editBugWindow.querySelector("#edit-bug-status-value").value;
    let developer = document.getElementById("edit-bug-dev-value").value;
    let project = document.getElementById("edit-bug-project-value").value;
    if(developer == "unassigned") {
        developer = null;
    }
    if(project == "unassigned") {
        project = null;
    }

    const bug = {
        bug_title: title,
        bug_status: status,
        bug_description: description,
        developer: developer,
        project: project,
        last_updated: Date.now(),
        bug_id: id
    }

    //console.log(bug);
    updateBug(bug)
        .then(() => {
            buildDashboard();
            closeEditBugWindow();
        })
        .catch((error) => {
            console.log(error);
        });
});