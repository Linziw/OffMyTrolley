window.addEventListener('DOMContentLoaded', (event) => {
    let login_button = document.getElementById("login-button");
    let signup_button = document.getElementById("signup-button");
    let login_form = document.getElementById("login-form");
    let signup_form = document.getElementById("signup-form");

    login_button.addEventListener("click", function(e) {
        alert("login has been clicked!")
        login_button.classList.add("hidden")
        signup_button.classList.add("hidden")
        login_form.classList.remove("hidden")
    });

    signup_button.addEventListener("click", function(e) {
        alert("signup has been clicked!")
        login_button.classList.add("hidden")
        signup_button.classList.add("hidden")
        signup_form.classList.remove("hidden")
    });


})