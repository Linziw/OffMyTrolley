let allTrolleys = [] // A place to keep all of the Trolley objects once created.
let toggle = 0 // The counter for toggling the card colours
let userObject // Where the object for the current user is stored

// initial page load
window.addEventListener('DOMContentLoaded', (event) => {
    loginEvents(); //make login button clickable
    signupEvents(); //make signup button clickable
    getTrolleys(); //fetch the trolleys from RAILS in the backgroud
    plusButtonEvents(); //make a plus button to add new trolleys (hidden at first)
})

function allsortedbydistance() {
    return allTrolleys.sort(function(a, b) {
        var thingA = a.distance;
        var thingB = b.distance;
        return (thingA < thingB) ? -1 : (thingA > thingB) ? 1 : 0;
    })
}

function allsortedbydate() {
    return allTrolleys.sort(function(a, b) {
        var thingA = a.date;
        var thingB = b.date;
        return (thingA < thingB) ? -1 : (thingA > thingB) ? 1 : 0;
    })
}

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

    fetch(`http://api.postcodes.io/postcodes/${formPostcode}`)
        .then(res => res.json())
        .then(data => obj = data)
        .then(() => {
            userLongitude = obj.result.longitude
            userLatitude = obj.result.latitude

            let data = { username: formUsername, password: formPassword, email: formEmail, postcode: formPostcode, latitude: userLatitude, longitude: userLongitude }
            let configObj = {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data)
            };

            fetch("http://localhost:3000/users", configObj)
                .then(response => response.json())
                .then(result => {
                    userObject = result
                    console.log(userObject)
                    displayTrolleys();
                    displayUser(userObject)
                    hideForm(signupForm);
                    displaySortButtons()
                })

        })
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
        .then(response => response.json())
        .then(result => {
            userObject = result
            console.log(userObject)
            displayTrolleys();
            displayUser(userObject, "back")
            hideForm(loginForm);
            displaySortButtons()
        })


}

function getTrolleys() {
    fetch('http://localhost:3000/trolleys')
        .then(response =>
            response.json())
        .then(object => createTrolleys(object))

}

function hideForm(form) {
    form.classList.add("hidden")
}

function showForm(form) {
    form.classList.remove("hidden")
}

function displayTrolleys(sortOption = allsortedbydistance()) {
    console.log(allTrolleys)
    let trolleydisplay = document.createElement("trolley-display")
    trolleydisplay.classList.add("center")
        //let trolleydisplay = document.getElementsByTagName("trolley-display")[0]
    sortOption.forEach(trolley => trolleydisplay.appendChild(makeCard(trolley)));
    showForm(document.getElementsByClassName("add-trolley")[0])
    document.getElementsByTagName("footer")[0].parentNode.insertBefore(trolleydisplay, trolleydisplay.nextSibling)
}

function createTrolleys(trolleys) {
    trolleys.forEach(trolley => {
        allTrolleys.push(new Trolley(trolley.id, trolley.date, trolley.time, trolley.supermarket, trolley.space, trolley.user.username, trolley.user.email,
            trolley.user.postcode, trolley.user_id, parseFloat(trolley.user.latitude), parseFloat(trolley.user.longitude)))
    });

}


class Trolley {
    constructor(id, date, time, supermarket, space, username, email, postcode, user_id, latitude, longitude) {
        this.id = id
        this.date = date;
        this.time = time;
        this.supermarket = supermarket;
        this.space = space;
        this.username = username;
        this.email = email;
        this.postcode = postcode;
        this.user_id = user_id;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    get distance() {
        let R = 6371; // Radius of the earth in km
        let dLat = deg2rad(parseFloat(userObject.latitude) - this.latitude); // deg2rad below
        let dLon = deg2rad(parseFloat(userObject.longitude) - this.longitude);
        let a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(parseFloat(userObject.latitude))) * Math.cos(deg2rad(this.latitude)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c; // Distance in km

        return d;
    }

}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
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

function displayUser(userObject, greeting = "") {
    let welcome = document.createElement("h2")
    welcome.innerText = `Welcome ${greeting} ${userObject.username}, choose a trolley delivery, or add one of your own `
    let heading = document.getElementById("heading")
    heading.append(welcome)
}

function plusButtonEvents() {
    let plusButton = document.getElementsByClassName("add-trolley")[0];
    plusButton.addEventListener("click", function(e) {
        hideForm(plusButton);
        hideForm(document.getElementsByClassName("sortButton")[0])

        new_trolley_form.classList.remove("hidden")

        hideForm(document.getElementsByTagName("trolley-display")[0])

        h2 = document.getElementsByTagName("h2")[0]
        hideForm(h2)

        let cancel = document.getElementById("cancel");
        cancel.addEventListener("click", (event) => {
            event.preventDefault();
            hideForm(new_trolley_form);
            document.getElementsByClassName("sortButton")[0].classList.remove("hidden")
            showForm((document.getElementsByTagName("trolley-display")[0]))
            showForm(document.getElementsByClassName("add-trolley")[0])

        })


        let new_trolley_submit = document.getElementById("new_trolley_submit");
        new_trolley_submit.addEventListener("click", (event) => {
            event.preventDefault();
            submitTrolleyForm();
        })
    })
}

function submitTrolleyForm() {
    let new_trolley_form = document.getElementById("new_trolley_form")
    let formDate = document.getElementById('t-date').value
    let formTime = document.getElementById('t-time').value
    let formSupermarket = document.getElementById('t-supermarket').value
    let formSpace = document.getElementById('t-space').value
    let trolleydisplay = document.getElementsByTagName("trolley-display")[0]
    let data = { user_id: userObject.id, date: formDate, time: formTime, supermarket: formSupermarket, space: formSpace }

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

            newtrolley = new Trolley(trolley.id, trolley.date, trolley.time, trolley.supermarket, trolley.space, trolley.user.username, trolley.user.email,
                trolley.user.postcode, trolley.user_id, parseFloat(trolley.user.latitude), parseFloat(trolley.user.longitude))
            allTrolleys.push(newtrolley)
            console.log(allTrolleys)
            trolleydisplay.appendChild(makeCard(newtrolley))
        })
    hideForm(new_trolley_form);
    document.getElementsByClassName("sortButton")[0].classList.remove("hidden")
    showForm(trolleydisplay)
    showForm(document.getElementsByClassName("add-trolley")[0])

}

//eventually use this to refactor code!!
function alternativemakeCard(trolley) {
    let card = document.createElement("div")
    card.innerHTML =
        `<div class = "card green">`
    return card
}

//This section is just for making the cards
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function makeCard(trolley) {
    //top level
    let card = document.createElement("div")
    card.classList.add("card")
    card.id = trolley.id
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
    distance.innerText = `${Math.round(trolley.distance * 10) / 10} kms`

    let image = document.createElement("img")
    if (toggle % 2 == 0) {
        image.id = "green"
    }
    image.src = findImage(trolley)
    image.classList.add("card-image")

    let datetime = document.createElement("div")
    datetime.classList.add("points")
    datetime.classList.add("center")
    datetime.innerText = formatDate(trolley)

    let d_button = document.createElement("img")
    d_button.src = "images/delete.png"
    d_button.classList.add("delete")
    d_button.addEventListener("click", e => {
        alert("You've deleted your trolley");
        deleteTrolley(trolley)
    })


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

    let postcodemarker = document.createElement("span")
    postcodemarker.innerText = "Postcode"

    let d = document.createElement("span")
    d.innerText = trolley.postcode

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
    please reply to this email to confirm and arrange details, then login and delete your trolley from the website to prevent further enquiries, thanks!`
    i2.addEventListener("click", function(e) {
        domDeleteTrolley(trolley)
    })

    //append stats
    stat1.appendChild(title)
    stat1.appendChild(i)
    stat2.appendChild(title2)
    stat2.appendChild(i2)

    //append level 5
    coords.appendChild(shopbrand)
    coords.appendChild(supermarket)
    coords2.appendChild(postcodemarker)
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
    if (trolley.user_id == userObject.id) {
        usercard.appendChild(d_button)
    }


    //append level 3
    additional.appendChild(usercard)
    additional.appendChild(moreinfo)

    //append level 2
    card.appendChild(additional)
    card.appendChild(general)

    //append top level

    toggle += 1

    return card
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////

function domDeleteTrolley(trolley) {
    document.getElementById(trolley.id).remove()
}


function deleteTrolley(trolley) {
    let card = document.getElementById(trolley.id)
    hideForm(card)
        //post fetch request to delete from database
    let configObj = {
        method: 'delete',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(trolley)
    };

    fetch(`http://localhost:3000/trolleys/${trolley.id}`, configObj)
        .then(function(response) {
            return response.json();
        })
        .then(function(confirmation) {

            console.log(confirmation)
        })
}

function displaySortButtons() {
    let header = document.getElementsByTagName("header")[0]
    let sortButtons = document.createElement("div")
    sortButtons.classList.add("sortButton")

    let distanceButton = document.createElement("button")
    let dateButton = document.createElement("button")
    distanceButton.innerHTML = "Sort by Distance"
    dateButton.innerHTML = "Sort by Date"

    distanceButton.addEventListener("click", function(e) {
        oldTrolleys = document.getElementsByTagName("trolley-display")[0];
        console.log(oldTrolleys)
        oldTrolleys.parentNode.removeChild(oldTrolleys);
        displayTrolleys(allsortedbydistance())
    })

    dateButton.addEventListener("click", function(e) {
        oldTrolleys = document.getElementsByTagName("trolley-display")[0];
        console.log(oldTrolleys)
        oldTrolleys.parentNode.removeChild(oldTrolleys);
        displayTrolleys(allsortedbydate())
    })

    sortButtons.appendChild(dateButton)
    sortButtons.appendChild(distanceButton)
    header.appendChild(sortButtons)
}