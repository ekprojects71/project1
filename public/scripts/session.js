//sores the logged in user's info here (companyID, First_Name, Last_Name, Status)
let sessionUser = {
    user_id: null,
    first_name: null,
    last_name: null,
    status: null,
    company_id: null
};

//all data used within the app
let companyName = null;
let users = null;
let bugs = null;
let projects = null;

//*for the dashboard & modals*
async function retrieveAppData() {
    const data = await getData();
    return data;
}


//for the user actions dropdown & profile in navbar
function buildUserProfile() {
    document.querySelector(".user-actions .first-name").innerText = sessionUser.first_name;
    document.querySelector(".profile-fname").innerText = sessionUser.first_name;
    document.querySelector(".profile-lname").innerText = sessionUser.last_name;

    switch(sessionUser.status) {
        case 0:
            document.querySelector(".profile-type").innerText = "Demo";
            break;
        case 1:
            document.querySelector(".profile-type").innerText = "User";
            break;
        case 2:
            document.querySelector(".profile-type").innerText = "Developer";
            break;
        case 3:
            document.querySelector(".profile-type").innerText = "Admin";
            break;
    }
}

function setSessionUser(user) {
    sessionUser.user_id = user.user_id;
    sessionUser.first_name = user.first_name;
    sessionUser.last_name = user.last_name;
    sessionUser.status = user.status;
    sessionUser.company_id = user.company_id;
}

//*call in app*
async function createUserProfile() {
    const user = await getUserData();

    setSessionUser(user);
    buildUserProfile();
}