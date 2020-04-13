window.addEventListener('DOMContentLoaded', (event) => {
    loginEvents()
    signupEvents()



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
                submitForm(login_form)
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
                submitForm(signup_form);
            })
        });
    }

    function submitForm(form) {
        let data = new FormData(form)
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
    }

})