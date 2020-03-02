//DOM Queries
const viewBugWindow = document.querySelector(".view-bug-window");

//Draw to DOM
function createViewBugWindow(status, title, description, 
                            submitter, developer, project, lastUpdated) 
{
    let statusClass = status.toLowerCase();
    viewBugWindow.innerHTML = `
    <button class="view-bug-exit">X</button>

    <div class="view-bug-title">
        <span class="status ${statusClass}">${status}</span>
        <span>${title}</span>
    </div>
    <div class="view-bug-descrip">
        <p>
            ${description}
        </p>
    </div>
    <div class="view-bug-submitter">
        <span>Submitted By: </span>
        <span>${submitter}</span>
    </div>
    <div class="view-bug-developer">
        <span>Assigned To: </span>
        <span>${developer}</span>
    </div>
    <div class="view-bug-project">
        <span>Project: </span>
        <span>${project}</span>
    </div>
    <div class="view-bug-updated">
        <span>Last Updated: </span>
        <span>${lastUpdated}</span>
    </div>`;
}

//open, close the window
function openViewBugWindow() {
    viewBugWindow.scrollIntoView();
    bckgTint.classList.toggle("d-none");
    bckgTint.style.zIndex = 2;
    viewBugWindow.classList.toggle("d-none");
}

function closeViewBugWindow() {
    bckgTint.classList.toggle("d-none");
    viewBugWindow.classList.toggle("d-none");
}

//event listener
viewBugWindow.addEventListener("click", (e) => {
    if(e.target == viewBugWindow.querySelector(".view-bug-exit")) {
        closeViewBugWindow();
    }
});