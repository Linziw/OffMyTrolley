window.addEventListener('DOMContentLoaded', (event) => {
    let login_button = document.getElementById("login-button");
    let signup_button = document.getElementById("signup-button");
    let login_form = document.getElementById("login-form");
    let signup_form = document.getElementById("signup-form");

    login_button.addEventListener("click", function(e) {
        login_button.classList.add("hidden");
        signup_button.classList.add("hidden");
        login_form.classList.remove("hidden");

        let login_submit = document.getElementById("login-submit");
        login_submit.addEventListener("click", (event) => {
            event.preventDefault()
        })

    });

    signup_button.addEventListener("click", function(e) {
        login_button.classList.add("hidden")
        signup_button.classList.add("hidden")
        signup_form.classList.remove("hidden")

        let signup_submit = document.getElementById("signup-submit");
        signup_submit.addEventListener("click", (event) => {
            event.preventDefault()
        })
    });



})