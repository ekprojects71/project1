//auth
async function login(email, password) {
    const loginData = {
        email: email,
        password: password
    };

    const url = "/auth/login";

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(loginData)
    });

    if(!response.ok)
    {   
        throw response.status;
    }
    else
    {
        return response;
    }
}

async function logout() {
    const url = `/auth/logout`;

    const response = await fetch(url);
    
    if(!response.ok)
    {   
        throw response.status;
    }
    else
    {
        return response;
    }
}

async function getUserData() {
    const url = `/auth/user`;

    const response = await fetch(url);

    if(!response.ok)
    {   
        throw response.status;
    }
    else
    {
        const data = await response.json();
        return data;
    }
}


//API
async function getData() {
    const url = `/api/dashboard`;

    const response = await fetch(url);

    if(!response.ok)
    {   
        throw response.status;
    }
    else
    {
        const data = await response.json();
        return data;
    }
}

//create, update, delete - bug
async function createBug(bug) {
    const url = `/api/bugs`;

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(bug)
    });

    if(!response.ok)
    {   
        throw response.status;
    }
    else
    {
        return response;
    }
}

async function updateBug(bug) {
    const url = `/api/bugs`;

    const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(bug)
    });

    if(!response.ok)
    {   
        throw response.status;
    }
    else
    {
        return response;
    }
}

async function deleteBug(bugID) {
    const url = `/api/bugs/${bugID}`;

    const response = await fetch(url, {
        method: "DELETE"
    });

    if(!response.ok)
    {   
        throw response.status;
    }
    else
    {
        return response;
    }
}

//create, update, delete - project
async function createProject(project) {
    const url = `/api/projects`;

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(project)
    });

    if(!response.ok)
    {   
        throw response.status;
    }
    else
    {
        console.log(response);
        return response;
    }
}

async function updateProject(project) {
    const url = `/api/projects`;

    const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(project)
    });

    if(!response.ok)
    {   
        throw response.status;
    }
    else
    {
        return response;
    }
}

async function deleteProject(projectID) {
    const url = `/api/projects/${projectID}`;

    const response = await fetch(url, {
        method: "DELETE"
    });

    if(!response.ok)
    {   
        throw response.status;
    }
    else
    {
        return response;
    }
}