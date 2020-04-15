window.addEventListener('DOMContentLoaded', (event) => {
    loginEvents();
    signupEvents();
    getTrolleys();
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
    displayTrolleys()
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
    displayTrolleys()
}

function getTrolleys() {
    fetch('http://localhost:3000/trolleys')
        .then(response =>
            response.json())
        .then(object =>
            createTrolleys(object))
}

function hideForm(form) {
    form.classList.add("hidden")
}

function displayTrolleys() {
    console.log(allTrolleys)
    let trolley_div = document.getElementById("trolleys")
    trolley_div.classList.remove("hidden")

    let divcenter = document.createElement("div")
    divcenter.classList.add("center")




    allTrolleys.forEach(trolley => {
        let card = document.createElement("div")
        card.classList.add("card")

        let additional = document.createElement("div")
        additional.classList.add("additional")

        let usercard = document.createElement("div")
        usercard.classList.add("user-card")

        let distance = document.createElement("div")
        distance.classList.add("level")
        distance.classList.add("center")
        distance.innerText = trolley.postcode

        let datetime = document.createElement("div")
        datetime.classList.add("points")
        datetime.classList.add("center")
        datetime.innerText = trolley.date



        let moreinfo = document.createElement("div")
        moreinfo.classList.add("more_info")

        let h1 = document.createElement("h1")
        h1.innerText = trolley.username

        let coords = document.createElement("div")
        coords.classList.add("coords")

        let shopbrand = document.createElement("span")
        shopbrand.innerText = "Supermarket"

        let supermarket = document.createElement("span")
        supermarket.innerText = trolley.supermarket

        coords.appendChild(shopbrand)
        coords.appendChild(supermarket)




        moreinfo.appendChild(h1)
        moreinfo.appendChild(coords)

        usercard.appendChild(distance)
        usercard.appendChild(datetime)




        additional.appendChild(usercard)
        additional.appendChild(moreinfo)
        card.appendChild(additional)

        divcenter.appendChild(card)
    })

    trolley_div.appendChild(divcenter)
}






function createTrolleys(trolleys) {
    trolleys.forEach(trolley => {
        allTrolleys.push(new Trolley(trolley.date, trolley.time, trolley.supermarket, trolley.space, trolley.user.username, trolley.user.email, trolley.user.postcode))
    });

}

let allTrolleys = []

class Trolley {
    constructor(date, time, supermarket, space, username, email, postcode) {
        this.date = date;
        this.time = time;
        this.supermarket = supermarket;
        this.space = space;
        this.username = username;
        this.email = email;
        this.postcode = postcode
    }
}

//trolley object looks like this
//{id: 2, date: "2020-08-21", time: "2000-01-01T12:00:00.000Z", supermarket: "Iceland", space: 10, …}