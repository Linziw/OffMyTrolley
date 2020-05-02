// initial page load
window.addEventListener('DOMContentLoaded', (event) => {
    loginEvents(); //make login button clickable
    signupEvents(); //make signup button clickable
    getTrolleys(); //fetch the trolleys from RAILS in the backgroud
    plusButtonEvents(); //make a plus button to add new trolleys (hidden at first)
    logoutEvents(); // make logout button clickable (hidden at first)
})

function loginEvents() {
    let login_button = document.getElementById("login-button");
    login_button.addEventListener("click", () => {
        login_button.classList.toggle("hidden");
        document.getElementById("signup-button").classList.toggle("hidden");
        document.getElementById("login-form").classList.toggle("hidden");
        document.getElementById("login-submit").addEventListener("click", (event) => {
            event.preventDefault();
            submitLoginForm()
        })
    });
}

function signupEvents() {
    let signup_button = document.getElementById("signup-button")
    signup_button.addEventListener("click", () => {
        signup_button.classList.toggle("hidden")
        document.getElementById("login-button").classList.toggle("hidden")
        document.getElementById("signup-form").classList.toggle("hidden")
        document.getElementById("signup-submit").addEventListener("click", (event) => {
            event.preventDefault();
            submitSignupForm();
        })
    });
}
//these two above are nearly identical, can refactor together somehow?
function getTrolleys() {
    fetch('http://localhost:3000/trolleys')
        .then(response =>
            response.json())
        .then(object => createTrolleys(object))
}

function plusButtonEvents() {
    document.getElementsByClassName("add-trolley")[0].addEventListener("click", function(e) {
        toggleViews();
        document.getElementById("cancel").addEventListener("click", (event) => {
            event.preventDefault();
            toggleViews()
        });
        clearEventListeners(document.getElementById("new_trolley_submit"));
        //add new event listeners back on
        document.getElementById("new_trolley_submit").addEventListener("click", (event) => {
            event.preventDefault();
            submitTrolleyForm();
        })
    })
}

function logoutEvents() {
    document.getElementsByClassName("logout")[0].addEventListener("click", function(e) {
        event.preventDefault();

        fetch("http://localhost:3000/logout")
            .then(response => response.json())
            .then(result => {
                userObject = {};
                location.reload();
                alert(result.message)
            })
            .catch(function(error) {
                alert("We cannot log you out, you are doomed to stay forever, so sorry...");
            })
    })
}

function submitLoginForm() {
    let form = document.getElementById("login-form");
    let formUsername = document.getElementById('li-username').value;
    let formPassword = document.getElementById('li-password').value;
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
        .then(result => loadMainPage(result, form))
        .catch(function(error) {
            alert("We cannot verify you, please try again");
        })
}

function submitSignupForm() {
    let form = document.getElementById("signup-form");
    let formUsername = document.getElementById('su-username').value;
    let formEmail = document.getElementById('su-email').value;
    let formPassword = document.getElementById('su-password').value;
    let formPostcode = document.getElementById('su-postcode').value;

    fetch(`http://api.postcodes.io/postcodes/${formPostcode}`)
        .then(res => res.json())
        .then(data => obj = data)
        .then(() => {
            userLongitude = obj.result.longitude;
            userLatitude = obj.result.latitude;

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
                .then(result =>
                    loadMainPage(result, form)
                )

        })
        .catch(function(error) {
            alert("Bad Postcode!");
            console.log(error.message)
        })
}

function loadMainPage(user, form) {
    userObject = user;
    console.log(user);
    displayTrolleys();
    displayUser(user);
    form.classList.toggle("hidden");
    displaySortButtons();
    document.getElementsByClassName("logout")[0].classList.toggle("hidden")
}

function displayTrolleys(sortOption = "distance") {
    console.log(allTrolleys);
    let trolleydisplay = document.createElement("trolley-display");
    trolleydisplay.classList.add("center");
    allsortedby(sortOption).forEach(trolley => trolleydisplay.appendChild(makeCard(trolley)));
    document.getElementsByClassName("add-trolley")[0].classList.remove("hidden")
    document.getElementsByTagName("footer")[0].parentNode.insertBefore(trolleydisplay, trolleydisplay.nextSibling)
}

function createTrolleys(trolleys) {
    trolleys.forEach(trolley => {
        allTrolleys.push(new Trolley(trolley.id, trolley.date, trolley.time, trolley.supermarket, trolley.space, trolley.user.username, trolley.user.email,
            trolley.user.postcode, trolley.user_id, parseFloat(trolley.user.latitude), parseFloat(trolley.user.longitude)))
    });
}

function sendMail(trolley) {
    var link = 'mailto:hello@domain.com?subject=Message from ' +
        document.getElementById('email_address').value +
        '&body=' + document.getElementById('email_address').value;
    window.location.href = link;
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
            console.log(trolley)

            newtrolley = new Trolley(trolley.id, trolley.date, trolley.time, trolley.supermarket, trolley.space, trolley.user.username, trolley.user.email,
                trolley.user.postcode, trolley.user_id, parseFloat(trolley.user.latitude), parseFloat(trolley.user.longitude))
            allTrolleys.push(newtrolley)
            console.log(allTrolleys)
            trolleydisplay.appendChild(makeCard(newtrolley))
            toggleViews()
        })
        .catch(function(error) {
            alert("Please try to add a trolley again, this time make sure you fill in every field, and check that the date is in the future!");
            new_trolley_form.reset()
        })

}

//main method for creating display of cards - anyway to move html into some sort of template?//
function makeCard(trolley) {
    function toggleColour() {
        if (toggle % 2 == 0)
            return "green"
        else
            return ""
    }

    let card = document.createElement("div")
    card.innerHTML = `
    <div class="card ${toggleColour()}"
      id = "${trolley.id}" >
      <div class="additional">
        <div class="user-card">
          <div class="level center">${Math.round(trolley.distance * 10) / 10} km</div>
          <img src="images/${trolley.supermarket}.jpg" class="card-image" id=${toggleColour()}>
          <div class="points center">${formatDate(trolley)}</div>
        </div>
        <div class="more-info">
          <h1>${trolley.username}</h1>
          <p>"${trolley.username} has a delivery slot on ${formatDate(trolley)} at ${formatTime(trolley)} from ${trolley.supermarket}.  They have space for ${trolley.space} more items, please contact them to see if they can add your items!"</p>
          <div class="coords">    
          </div>
        <div class="coords"> 
        </div>
        <div class="stats">
        <div>
          <div class="title">Contact</div>
          <a class="value" href="mailto:${trolley.email}?subject=Email from OffMyTrolley&amp;body=Hi ${trolley.username}, I would love to order a few groceries using the spare slots you have please, here is a list of what i'd like ....
          please reply to this email to confirm and arrange details, then login and delete your trolley from the website to prevent further enquiries, thanks! ${userObject.name}">@</a></div>
        </div>
      </div>
    </div>
  <div class="general">
    <h1>${trolley.username}</h1>
    <span>Supermarket - </span>
    <span>${trolley.supermarket}</span><br><br>
    <span>Postcode - </span>
    <span>${trolley.postcode}</span>
    <div class="stats">
      <div class="title">Item spaces</div>
      <div class="value">${trolley.space}</div>
    </div>
  </div>
</div>`

    let d_button = document.createElement("img")
    d_button.src = "images/delete.png"
    d_button.classList.add("delete")
    d_button.addEventListener("click", e => {
        alert("You've deleted your trolley");
        deleteTrolley(trolley)
    })

    let e_button = document.createElement("img")
    e_button.src = "images/edit.png"
    e_button.classList.add("edit")
    e_button.addEventListener("click", e => {
        editTrolley(trolley)
    })

    if (trolley.user_id == userObject.id) {
        icons = document.createElement("div")
        icons.classList.add("icons")
        icons.appendChild(e_button);
        icons.appendChild(d_button);
        card.getElementsByClassName("user-card")[0].appendChild(icons)
    }

    toggle += 1
    return card
}


function deleteTrolley(trolley) {
    let card = document.getElementById(trolley.id)
    card.classList.toggle("hidden")
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

            oldTrolleyIndex = allTrolleys.findIndex(Trolley => Trolley.id == trolley.id);
            allTrolleys.splice(oldTrolleyIndex, 1);
            console.log(confirmation)
        })
}

function displaySortButtons() {
    document.getElementsByClassName("sortButton")[0].classList.toggle("hidden")
    let distanceButton = document.getElementById("distance")
    let dateButton = document.getElementById("date")
    let supermarketButton = document.getElementById("supermarket")

    function sortButtonEventListeners(button, sortOption) {
        button.addEventListener("click", function(e) {
            oldTrolleys = document.getElementsByTagName("trolley-display")[0];
            oldTrolleys.parentNode.removeChild(oldTrolleys);
            displayTrolleys(sortOption)
        })
    };

    sortButtonEventListeners(distanceButton, "distance");
    sortButtonEventListeners(dateButton, "date");
    sortButtonEventListeners(supermarketButton, "supermarket");
}

//almost exactly the same as plusButtonEvents method
function editTrolley(trolley) {
    h3 = document.getElementsByTagName("h3")[0];
    h3.classList.toggle("hidden")
    toggleViews();

    let cancel = document.getElementById("cancel");
    cancel.addEventListener("click", (event) => {
        event.preventDefault();
        toggleViews()
    })

    clearEventListeners(document.getElementById("new_trolley_submit"));
    let submitButton = document.getElementById("new_trolley_submit");
    submitButton.addEventListener("click", event => {
        event.preventDefault();
        submitEditTrolleyForm(trolley)
    })
}

function submitEditTrolleyForm(trolley) {
    let formDate = document.getElementById('t-date').value
    let formTime = document.getElementById('t-time').value
    let formSupermarket = document.getElementById('t-supermarket').value
    let formSpace = document.getElementById('t-space').value
    let data = { user_id: userObject.id, date: formDate, time: formTime, supermarket: formSupermarket, space: formSpace }

    let configObj = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    };

    fetch(`http://localhost:3000/trolleys/${trolley.id}`, configObj)
        .then(function(response) {
            return response.json();
        })
        .then(function(trolley) {
            oldTrolley = allTrolleys.find(Trolley => Trolley.id == trolley.id);
            newTrolley = Object.assign(oldTrolley, trolley);
            let oldcard = document.getElementById(trolley.id);
            let newcard = makeCard(newTrolley);
            oldcard.parentNode.replaceChild(newcard, oldcard)
        })

    document.getElementsByTagName("h3")[0].classList.toggle("hidden");
    toggleViews();
    clearEventListeners(document.getElementById("new_trolley_submit"))
}