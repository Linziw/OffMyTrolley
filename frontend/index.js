window.addEventListener('DOMContentLoaded', (event) => {
    let login_button = document.getElementById("login-button");
    login_button.addEventListener("click", function(e) {
        alert("login has been clicked!")
    });

    let signup_button = document.getElementById("signup-button");
    signup_button.addEventListener("click", function(e) {
        alert("signup has been clicked!")
    });


})