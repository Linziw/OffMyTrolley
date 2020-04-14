window.addEventListener('DOMContentLoaded', (event) => {
    loginEvents()
    signupEvents()
})

function loginEvents() {
    let login_button = document.getElementById("login-button");
    let login_form = document.getElementById("login-form");
    let signup_button = document.getElementById("signup-button");

    login_button.addEventListener("click", function(e) {
        login_button.classList.add("hidden");
        signup_button.classList.add("hidden");
        login_form.classList.remove("hidden");

        let login_submit = document.getElementById("login-submit");
        login_submit.addEventListener("click", (event) => {
            event.preventDefault();
            submitLoginForm()
        })
    });
}

function signupEvents() {
    let signup_button = document.getElementById("signup-button");
    let signup_form = document.getElementById("signup-form");
    let login_button = document.getElementById("login-button");

    signup_button.addEventListener("click", function(e) {
        login_button.classList.add("hidden")
        signup_button.classList.add("hidden")
        signup_form.classList.remove("hidden")

        let signup_submit = document.getElementById("signup-submit");
        signup_submit.addEventListener("click", (event) => {
            event.preventDefault();
            submitSignupForm();
        })
    });
}

function submitSignupForm() {
    let signupForm = document.getElementById("signup-form")
    let formUsername = document.getElementById('su-username').value
    let formEmail = document.getElementById('su-email').value
    let formPassword = document.getElementById('su-password').value
    let formPostcode = document.getElementById('su-postcode').value
    let data = { username: formUsername, password: formPassword, email: formEmail, postcode: formPostcode }
    let configObj = {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    };

    fetch("http://localhost:3000/users", configObj)
        .then(function(response) {
            return response.json();
        })
        .then(function(object) {
            console.log(object)
        })
    hideForm(signupForm);
    getTrolleys()
}

function submitLoginForm() {
    let loginForm = document.getElementById("login-form");
    let formUsername = document.getElementById('li-username').value
    let formPassword = document.getElementById('li-password').value

    let data = { username: formUsername, password: formPassword }
    let configObj = {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    };

    fetch("http://localhost:3000/login", configObj)
        .then(function(response) {
            return response.json();
        })
        .then(function(object) {
            console.log(object)
        })
    hideForm(loginForm);
    getTrolleys()
}

function getTrolleys() {
    fetch('http://localhost:3000/trolleys')
        .then(response =>
            response.json())
        .then(object => console.log(object))
}

function hideForm(form) {
    form.classList.add("hidden")
}