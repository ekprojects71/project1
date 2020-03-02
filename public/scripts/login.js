const loginForm = document.querySelector(".login");
const loginErrorMsg = document.querySelector(".login-error-message span");
const loginErrorCont = document.querySelector(".login-error-message");


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