const loginForm = document.querySelector(".login");
const loginErrorMsg = document.querySelector(".login-error-message span");
const loginErrorCont = document.querySelector(".login-error-message");
const demoButtons = document.querySelector(".demo-list");


//demo login function
const demoLogin = async(credentials) => {
    const response = await fetch(`/auth/login/demo/${credentials}`, { method: "POST" });
    if(response.status === 200) {
        loginErrorCont.classList.add("d-none");
        location.reload();
    }
    else {
        loginErrorCont.classList.remove("d-none");
        loginErrorMsg.innerText = "Unable to log in. Please try again later.";
    }
}

//event listeners for login
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    loginErrorMsg.innerText ="";
    
    login(loginForm.email.value, loginForm.password.value)
        .then(() => {
            loginErrorCont.classList.add("d-none");
            location.reload();
        })
        .catch((error) => {
            if(error === 400) {
                loginErrorCont.classList.remove("d-none");
                loginErrorMsg.innerText = "Invalid email or password. Check your spelling and try again.";
            }
        });
});

demoButtons.addEventListener("click", e => {
    e.preventDefault();

    if(e.target.classList.contains("admin-demo")) {
        demoLogin(1);
    }
    else if(e.target.classList.contains("dev-demo")) {
        demoLogin(2);
    }
    else if(e.target.classList.contains("user-demo")) {
        demoLogin(3);
    }
});