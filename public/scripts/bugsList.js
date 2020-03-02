//DOM Queries
const bugsContainer = document.querySelector(".bug-cards-container");

//Draw to DOM
function drawBugCard(bug, developer, submitter, project) {
     let lastUpdated = "";
    if(bug.last_updated != null)
    {
        lastUpdated = moment.unix(bug.last_updated/1000).format('MM/DD/YYYY, h:mm a');
    }
    
    let status = "";
    switch(bug.bug_status) {
        case 0:
            status = "New";
            break;
        case 1:
            status = "Minor";
            break;
        case 2:
            status = "Major";
            break;
        case 3:
            status = "Severe";
            break;
        case 4:
            status = "Solved";
            break;
        default:
            status = "New";
            break;
    };

    if(bug.developer == null) {
        bug.developer = "unassigned";
    }
    if(bug.submitter == null) {
        bug.submitter = "unassigned";
    }
    if(bug.project == null) {
        bug.project = "unassigned";
    }

    let canView = sessionUser.status == 3 || sessionUser.user_id == bug.developer;
    let hideBtn = "";
    if(!canView) {
        hideBtn = "d-none";
    }

    bugsContainer.innerHTML += `
    <div class="bug-card" data-id="${bug.bug_id}">
        <div class="card-top">
            <span class="status ${status.toLowerCase()}" data-id="${bug.bug_status}">${status}</span>
            <span class="bug-title">${bug.bug_title}</span>
        </div>
        <div class="card-middle">
            <div class="bug-description">
                <span>
                   ${bug.bug_description} 
                </span>
            </div>
        </div>
        <div class="card-bottom">
            <button class="view-bug-btn">View</button>
            <button class="edit-bug-btn ${hideBtn}">Edit</button>
            <div class="bug-assigned-div">
                <span>Assigned to: </span>
                <span class="bug-assigned" data-id="${bug.developer}">${developer}</span>
            </div>
            <div class="bug-submitter-div">
                <span>Submitted by: </span>
                <span class="bug-submitter" data-id="${bug.submitter}">${submitter}</span>
            </div>
            <div class="bug-project-div">
                <span>Project: </span>
                <span class="bug-project" data-id="${bug.project}">${project}</span>
            </div>
            <div class="bug-time-div">
                <span>Last Updated:</span>
                <span class="bug-time">${lastUpdated}</span>
            </div>
        </div>
    </div>`;
};