//Submit Bug Form Container
const bugSubmitForm = document.querySelector(".bug-submit-window");


//Draw to DOM
const bugSubmitHTML = 
`<button class="bug-submit-exit">X</button>
<form id="bug-submit-form">
    <div>
        <label>Bug Title</label><br>
        <input type="text" id="bug-submit-title" placeholder='E.g. "Image not displaying"' maxlength=100 required><br>
        <p class="charlimit"><span class="title-climit">100</span> Characters Remaining</p>
    </div>
    <div>
        <label>Bug Description</label><br>
        <textarea name="comment" form="bug-submit-form" id="bug-submit-descrip" 
        placeholder="Describe the problem you are experiencing..." maxlength=500 required></textarea><br>
        <p class="charlimit"><span class="descrip-climit">500</span> Characters Remaining</p>
    </div>
    <input type="submit" id="bug-submit-button" value="Submit Bug">
</form>`;

function drawBugSubmitForm() {
    bugSubmitForm.scrollIntoView();
    bugSubmitForm.innerHTML = bugSubmitHTML;
    bugSubmitForm.classList.toggle("d-none");

    bckgTint.classList.toggle("d-none");
    bckgTint.style.zIndex = 2;
}

function closeBugSubmitForm() {
    bugSubmitForm.innerHTML = "";
    bugSubmitForm.classList.toggle("d-none");
    bckgTint.classList.toggle("d-none");
}

//event listeners
bugSubmitForm.addEventListener("click", (e) => {
    //close the form
    if(e.target == bugSubmitForm.querySelector(".bug-submit-exit")) {
        closeBugSubmitForm();
    }
});

bugSubmitForm.addEventListener("keyup", (e) => {
    let title = bugSubmitForm.querySelector("#bug-submit-title");
    let description = bugSubmitForm.querySelector("#bug-submit-descrip");
    let titleChars = bugSubmitForm.querySelector(".title-climit");
    let descripChars = bugSubmitForm.querySelector(".descrip-climit");

    titleChars.innerText = 100 - title.value.length;
    descripChars.innerText = 500 - description.value.length;

    if (title.value.length >= 100) {
        title.value = title.value.substring(0, 100);
    }

    if (description.value.length >= 500) {
        description.value = description.value.substring(0, 500);
    } 
});

bugSubmitForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("bug-submit-title").value;
    const description = document.getElementById("bug-submit-descrip").value;

    let bug = {
        bug_title: title,
        bug_status: 0,
        bug_description: description,
        submitter: sessionUser.user_id,
        developer: null,
        project: null,
        company: sessionUser.company_id,
        last_updated: Date.now()
    };

    //submit bug to server
    createBug(bug)
        .then(() => {
            closeBugSubmitForm();
            buildDashboard();
        })
        .catch((error) => {
            console.log(error);
        });
});