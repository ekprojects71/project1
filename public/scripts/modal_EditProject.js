//DOM Queries
const editProject = document.querySelector(".project-edit-window");
const editProjectMain = document.querySelector(".project-edit-main");
const addProjectForm = document.querySelector(".project-add");
const editProjectForm = document.querySelector(".project-edit");
const deleteProjectMsg = document.querySelector(".project-delete-confirm");

//Draw to DOM
function addProjectLI(projectName, id) {
    let projectLI = "";

    //attach data ID to each project
    projectLI += 
    `<li class="project-list-item" data-id="${id}">
        <span>${projectName}</span>
        <img src="images/trash_icon.svg" alt="delete-project" class="proj-del-icon">
        <img src="images/edit_icon.svg" alt="edit-project" class="proj-edit-icon">
    </li>`;

    return projectLI;
}

function drawProjectList(projectsList) {
    editProjectMain.innerHTML = `
    <h2>Projects</h2>
    <ul class="projects-list">

        ${projectsList}

    </ul>
    <button class="project-edit-add">+ Add Project</button>`;

    bckgTint.style.zIndex = 2;
};

//sub-menus
function drawAddProject() {
    addProjectForm.innerHTML = `
    <form id="project-add-form">
        <label>Project Name</label><br>
        <input type="text" class="project-name" required><br>
    </form>
    <div class="proj-form-btns">
        <button class="prj-add-btn" form="project-add-form">Add</button>
        <button class="prj-cancel-btn">Cancel</button> 
    </div>`;

    bckgTint.style.zIndex = 3;
    addProjectForm.classList.toggle("d-none");
}

function drawEditProject(projectName) {
    editProjectForm.innerHTML = `
    <form id="project-edit-form">
        <label>Edit Project Name</label><br>
        <input type="text" class="project-name" id="proj-edit-name" value="${projectName}" required><br>
    </form>
    <div class="proj-form-btns">
        <button class="prj-edit-btn" form="project-edit-form">Edit</button>
        <button class="prj-cancel-btn">Cancel</button> 
    </div>`;

    bckgTint.style.zIndex = 3;
    editProjectForm.classList.toggle("d-none");
}

function drawDelProjectMsg() {
    deleteProjectMsg.innerHTML = `
    <p>Are you sure you want to delete this project?</p>
    <button class="prj-delete-btn">Delete</button>
    <button class="prj-cancel-btn">Cancel</button>`;

    bckgTint.style.zIndex = 3;
    deleteProjectMsg.classList.toggle("d-none");
}

function closeAddProject() {
    bckgTint.style.zIndex = 2;
    addProjectForm.classList.toggle("d-none");
}
function closeEditProject() {
    bckgTint.style.zIndex = 2;
    editProjectForm.classList.toggle("d-none");
}
function closeDelProjectMsg() {
    bckgTint.style.zIndex = 2;
    deleteProjectMsg.classList.toggle("d-none");
}

//close, open functions
function drawProjectsWindow() {
    editProject.scrollIntoView();
    bckgTint.style.zIndex = 2;
    editProject.classList.toggle("d-none");
    bckgTint.classList.toggle("d-none");
}

function closeProjectsWindow() {
    editProject.classList.toggle("d-none");
    bckgTint.classList.toggle("d-none");
}


//event listeners
let currentProject = null;

editProject.addEventListener("click", (e) => {

    //close the window
    if(e.target == editProject.querySelector(".project-edit-exit")) {
        closeProjectsWindow();
    }

    //add a new project
    if(e.target == editProject.querySelector(".project-edit-add")) {
        drawAddProject();
    }

    //edit existing project
    if(e.target.classList.contains("proj-edit-icon")) {
        currentProject = e.target.parentNode;
        drawEditProject(currentProject.innerText);
    }

    //delete existing project
    if(e.target.classList.contains("proj-del-icon")) {
        currentProject = e.target.parentNode;
        drawDelProjectMsg();
    }

});

addProjectForm.addEventListener("click", (e) => {
    e.preventDefault();
    //close the window
    if(e.target == addProjectForm.querySelector(".prj-cancel-btn")) {
        closeAddProject();
    }

    //add a project & close the window
    if(e.target == addProjectForm.querySelector(".prj-add-btn")) {
        //add the project, make request
        let title = addProjectForm.querySelector(".project-name").value;
        if(title.length === 0) {
            title = "unassigned";
        }
        let project = {
            project_title: title,
            company_id: sessionUser.company_id
        }

        createProject(project)
            .then(() => {
                buildDashboard()
                .then(() => {
                    let projectsList = "";
                    if(projects.length > 0)
                    {
                        projects.forEach((project) => {
                            projectsList += addProjectLI(project.project_title, project.project_id);
                        });
                        drawProjectList(projectsList);
                    }
                    else {
                        drawProjectList(projectsList);
                    }
                });
                
                closeAddProject();
            })
            .catch((error) => {
                console.log(error);
                closeAddProject();
            });
    }
});

editProjectForm.addEventListener("click", (e) => {
    e.preventDefault();
    //close the window
    if(e.target == editProjectForm.querySelector(".prj-cancel-btn")) {
        closeEditProject();
    }

    //rename project & close the window
    if(e.target == editProjectForm.querySelector(".prj-edit-btn")) {
        //rename the project, make request
        let projectTitle = editProjectForm.querySelector(".project-name").value;
        let projectID = currentProject.getAttribute("data-id");
        
        let project = {
            project_id: projectID,
            project_title: projectTitle
        };
        
        updateProject(project)
            .then(() => {
                buildDashboard()
                .then(() => {
                    let projectsList = "";
                    if(projects.length > 0)
                    {
                        projects.forEach((project) => {
                            projectsList += addProjectLI(project.project_title, project.project_id);
                        });
                        drawProjectList(projectsList);
                    }
                    else {
                        drawProjectList(projectsList);
                    }
                });
                
                closeEditProject();
            })
            .catch((error) => {
                console.log(error);
                closeEditProject();
            });
    }
});


deleteProjectMsg.addEventListener("click", (e) => {
    //close the window
    if(e.target == deleteProjectMsg.querySelector(".prj-cancel-btn")) {
        closeDelProjectMsg();
    }

    //delete the project & close the window
    if(e.target == deleteProjectMsg.querySelector(".prj-delete-btn")) {
        //delete project, make request
        let projectID = currentProject.getAttribute("data-id");

        deleteProject(projectID)
            .then(() => {
                buildDashboard()
                    .then(() => {
                        let projectsList = "";
                        if(projects.length > 0)
                        {
                            projects.forEach((project) => {
                                projectsList += addProjectLI(project.project_title, project.project_id);
                            });
                            drawProjectList(projectsList);
                        }
                        else {
                            drawProjectList(projectsList);
                        }
                    });

                closeDelProjectMsg();  
            })
            .catch((error) => {
                console.log(error);
                closeDelProjectMsg();
            })
    }
});