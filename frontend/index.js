let session_id = ""
let toggle = 0
window.addEventListener('DOMContentLoaded', (event) => {
    loginEvents();
    signupEvents();
    getTrolleys();
    plusButtonEvents();

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
        .then(function(user) {
            displayUser(user)
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
        .then(function(user) {
            session_id = user.id
            displayUser(user, "back")
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

function showForm(form) {
    form.classList.remove("hidden")
}

function displayTrolleys() {
    console.log(allTrolleys)

    let divcenter = document.createElement("div")
    divcenter.classList.add("center")
    divcenter.id = "trolley-display"



    allTrolleys.forEach(trolley => divcenter.appendChild(makeCard(trolley)));
    document.body.appendChild(divcenter);
    showForm(document.getElementsByClassName("add-trolley")[0])
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


function sendMail(trolley) {
    var link = 'mailto:hello@domain.com?subject=Message from ' +
        document.getElementById('email_address').value +
        '&body=' + document.getElementById('email_address').value;
    window.location.href = link;
}

//trolley object looks like this
//{id: 2, date: "2020-08-21", time: "2000-01-01T12:00:00.000Z", supermarket: "Iceland", space: 10, …}

function findImage(trolley) {
    return `images/${trolley.supermarket}.jpg`
}

function formatDate(trolley) {
    let split = trolley.date.split("-")
    return split.reverse().join("-")
}

function formatTime(trolley) {
    split = trolley.time.split("")
    return split.slice(11, 16).join("")
}

function displayUser(user, greeting = "") {
    let welcome = document.createElement("h2")
    welcome.innerText = `Welcome ${greeting} ${user.username}, choose a trolley`
    let heading = document.getElementById("heading")
    heading.append(welcome)
}

function plusButtonEvents() {
    let plusButton = document.getElementsByClassName("add-trolley")[0];


    plusButton.addEventListener("click", function(e) {
        hideForm(plusButton);
        new_trolley_form.classList.remove("hidden")

        hideForm(document.getElementById("trolley-display"))

        let new_trolley_submit = document.getElementById("new_trolley_submit");
        new_trolley_submit.addEventListener("click", (event) => {
            event.preventDefault();
            submitTrolleyForm();
        })
    })
}

function submitTrolleyForm() {
    let new_trolley_form = document.getElementById("new_trolley_form")
    let user_id = session_id
    let formDate = document.getElementById('t-date').value
    let formTime = document.getElementById('t-time').value
    let formSupermarket = document.getElementById('t-supermarket').value
    let formSpace = document.getElementById('t-space').value
    let data = { user_id: user_id, date: formDate, time: formTime, supermarket: formSupermarket, space: formSpace }
    let divcenter = document.getElementById("trolley-display")
    let configObj = {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    };

    fetch("http://localhost:3000/trolleys", configObj)
        .then(function(response) {
            return response.json();
        })
        .then(function(trolley) {

            console.log(trolley)
            divcenter.appendChild(makeCard(trolley))
        })
    showForm(divcenter)
    showForm(document.getElementsByClassName("add-trolley")[0])
    hideForm(new_trolley_form);
}

function makeCard(trolley) {
    //top level
    let card = document.createElement("div")
    card.classList.add("card")
    if (toggle % 2 == 0)
        card.classList.add("green")


    //2nd level

    let additional = document.createElement("div")
    additional.classList.add("additional")

    //3rd level

    let usercard = document.createElement("div")
    usercard.classList.add("user-card")

    let moreinfo = document.createElement("div")
    moreinfo.classList.add("more-info")

    let general = document.createElement("div")
    general.classList.add("general")

    //4th level part 1

    let distance = document.createElement("div")
    distance.classList.add("level")
    distance.classList.add("center")
    distance.innerText = trolley.postcode

    let image = document.createElement("img")
    if (toggle % 2 == 0) {
        image.id = "green"
    }
    image.src = findImage(trolley)

    let datetime = document.createElement("div")
    datetime.classList.add("points")
    datetime.classList.add("center")
    datetime.innerText = formatDate(trolley)

    let generalh1 = document.createElement("h1")
    generalh1.innerText = trolley.username

    let generalp = document.createElement("p")
    generalp.innerText = `"${trolley.username} has a delivery slot booked for 
    ${formatDate(trolley)} at ${formatTime(trolley)} from ${trolley.supermarket}.  They have space for ${trolley.space} more items, please contact them to see if they can add your items!"`


    //4th level part 2

    let h1 = document.createElement("h1")
    h1.innerText = trolley.username

    let coords = document.createElement("div")
    coords.classList.add("coords")

    let coords2 = document.createElement("div")
    coords2.classList.add("coords")

    let stats = document.createElement("div")
    stats.classList.add("stats")

    //5th level

    let shopbrand = document.createElement("span")
    shopbrand.innerText = "Supermarket"

    let supermarket = document.createElement("span")
    supermarket.innerText = trolley.supermarket

    let distancemarker = document.createElement("span")
    distancemarker.innerText = "Distance"

    let d = document.createElement("span")
    d.innerText = "? miles"

    //stats at bottom of card

    let stat1 = document.createElement("div")

    let title = document.createElement("div")
    title.classList.add("title")
    title.innerText = "Item spaces"

    let i = document.createElement("div")
    i.classList.add("value")
    i.innerText = trolley.space

    let stat2 = document.createElement("div")

    let title2 = document.createElement("div")
    title2.classList.add("title")
    title2.innerText = "Contact"

    let i2 = document.createElement("a")
    i2.classList.add("value")
    i2.innerText = "@"
    i2.href = `mailto:${trolley.email}?subject=Email from OffMyTrolley&body=Hi ${trolley.username}, I would love to order a few groceries using the spare slots you have please, here is a list of what i'd like ....
    please reply to this email to confirm and arrange details, thanks!`

    //append stats
    stat1.appendChild(title)
    stat1.appendChild(i)
    stat2.appendChild(title2)
    stat2.appendChild(i2)

    //append level 5
    coords.appendChild(shopbrand)
    coords.appendChild(supermarket)
    coords2.appendChild(distancemarker)
    coords2.appendChild(d)
    stats.appendChild(stat1)
    stats.appendChild(stat2)

    //append level 4 part 2

    moreinfo.appendChild(h1)
    moreinfo.appendChild(coords)
    moreinfo.appendChild(coords2)
    moreinfo.appendChild(stats)

    //append level 4 part 1

    general.appendChild(generalh1)
    general.appendChild(generalp)
    usercard.appendChild(distance)
    usercard.appendChild(image)
    usercard.appendChild(datetime)

    //append level 3
    additional.appendChild(usercard)
    additional.appendChild(moreinfo)

    //append level 2
    card.appendChild(additional)
    card.appendChild(general)

    //append top level
    //divcenter.appendChild(card)

    toggle += 1

    return card
}