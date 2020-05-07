// initial page load
window.addEventListener('DOMContentLoaded', (event) => {
    loginEvents(); //make login button clickable
    signupEvents(); //make signup button clickable
    getTrolleys(); //fetch the trolleys from RAILS in the backgroud
    plusButtonEvents(); //make a plus button to add new trolleys (hidden at first)
    logoutEvents(); // make logout button clickable (hidden at first)
})

function loginEvents() {
    const loginButton = document.getElementById("login-button");
    loginButton.addEventListener("click", () => {
        loginButton.classList.toggle("hidden");
        document.getElementById("signup-button").classList.toggle("hidden");
        document.getElementById("login-form").classList.toggle("hidden");
        document.getElementById("login-submit").addEventListener("click", (event) => {
            event.preventDefault();
            submitLoginForm()
        })
    });
}

function signupEvents() {
    const signupButton = document.getElementById("signup-button")
    signupButton.addEventListener("click", () => {
        signupButton.classList.toggle("hidden")
        document.getElementById("login-button").classList.toggle("hidden")
        document.getElementById("signup-form").classList.toggle("hidden")
        document.getElementById("signup-submit").addEventListener("click", (event) => {
            event.preventDefault();
            submitSignupForm();
        })
    });
}
//these two above are nearly identical, can refactor together somehow? Not sure I can.
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
    const form = document.getElementById("login-form");
    let formUsername = document.getElementById('li-username').value;
    let formPassword = document.getElementById('li-password').value;
    let data = { username: formUsername, password: formPassword }

    const configObj = {
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
    const form = document.getElementById("signup-form");
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
            const configObj = {
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
    const trolleyDisplay = document.createElement("trolley-display");
    trolleyDisplay.classList.add("center");
    allSortedBy(sortOption).forEach(trolley => trolleyDisplay.appendChild(makeCard(trolley)));
    document.getElementsByClassName("add-trolley")[0].classList.remove("hidden")
    document.getElementsByTagName("footer")[0].parentNode.insertBefore(trolleyDisplay, trolleyDisplay.nextSibling)
}

function createTrolleys(trolleys) {
    trolleys.forEach(trolley => {
        allTrolleys.push(new Trolley(trolley))
    });
}

function submitTrolleyForm() {
    const newTrolleyForm = document.getElementById("new_trolley_form")
    let formDate = document.getElementById('t-date').value
    let formTime = document.getElementById('t-time').value
    let formSupermarket = document.getElementById('t-supermarket').value
    let formSpace = document.getElementById('t-space').value
    const trolleyDisplay = document.getElementsByTagName("trolley-display")[0]
    let data = { user_id: userObject.id, date: formDate, time: formTime, supermarket: formSupermarket, space: formSpace }

    const configObj = {
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

            let newTrolley = new Trolley(trolley)
            allTrolleys.push(newTrolley)
            console.log(allTrolleys)
            trolleyDisplay.appendChild(makeCard(newTrolley))
            toggleViews()
        })
        .catch(function(error) {
            alert("Please try to add a trolley again, this time make sure you fill in every field, and check that the date is in the future!");
            newTrolleyForm.reset()
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

    const card = document.createElement("div")
    card.innerHTML = `
    <div class="card ${toggleColour()}"
      id = "${trolley.id}" >
      <div class="additional">
        <div class="user-card">
          <div class="level center">${Math.round(trolley.distance * 10) / 10} km</div>
          <img src="images/${trolley.supermarket}.jpg" class="card-image" id=${toggleColour()}>
          <div class="points center">5 Stars</div>
          <div class="points center">${formatDate(trolley)}</div>
        </div>
        <div class="more-info">
          <h1>${trolley.username}</h1>
          <p>"${trolley.username} has a delivery slot on ${formatDate(trolley)} at ${formatTime(trolley)} from ${trolley.supermarket}.  They have space for ${trolley.space} more items, please contact them to see if they can add your items!"</p>
          
         <div class="stats">
            <div class="contact">
              <p class="title">Contact</p>
                <a class="value" href="mailto:${trolley.email}?subject=Email from OffMyTrolley&amp;body=Hi ${trolley.username}, I would love to order a few groceries using the spare slots you have please, here is a list of what i'd like ....
                 please reply to this email to confirm and arrange details, then login and delete your trolley from the website to prevent further enquiries, thanks! ${userObject.username}">@</a>
            </div>
        
            <div class="rate">
           <p class="title">Rate Supermarket</p>
           <div class="rating">
           </div></div>
           </div>
        </div>
    </div>

  <div class="general">
    <h1>${trolley.username}</h1>
    <span>Supermarket - </span>
    <span>${trolley.supermarket}</span><br><br>
    <span>Postcode - </span>
    <span>${trolley.postcode}</span><br>
    
    <div class="stats">
      <div class="title">Item spaces</div>
      <div class="value">${trolley.space}</div>
    </div>
  </div>
</div>`

    function hello() {
        alert("hi")
    }



    const deleteButton = document.createElement("img")
    deleteButton.src = "images/delete.png"
    deleteButton.classList.add("delete")
    deleteButton.addEventListener("click", e => {
        alert("You've deleted your trolley");
        deleteTrolley(trolley)
    })

    const editButton = document.createElement("img")
    editButton.src = "images/edit.png"
    editButton.classList.add("edit")
    editButton.addEventListener("click", e => {
        editTrolley(trolley)
    })

    function createStars() {
        for (i = 0; i < 5; i++) {
            const star = document.createElement("span")
            star.innerText = "☆"
            star.addEventListener("click", e => {
                console.log("clicked")
            })
            card.getElementsByClassName("rating")[0].appendChild(star)
        }
    }

    createStars()

    if (trolley.user_id == userObject.id) {
        icons = document.createElement("div")
        icons.classList.add("icons")
        icons.appendChild(editButton);
        icons.appendChild(deleteButton);
        card.getElementsByClassName("user-card")[0].appendChild(icons)
    }

    toggle += 1
    return card
}

function upvoteEvent() {

}


function deleteTrolley(trolley) {
    const card = document.getElementById(trolley.id)
    card.classList.toggle("hidden")
        //post fetch request to delete from database
    const configObj = {
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
    const distanceButton = document.getElementById("distance")
    const dateButton = document.getElementById("date")
    const supermarketButton = document.getElementById("supermarket")

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

    const configObj = {
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
            let oldCard = document.getElementById(trolley.id);
            let newCard = makeCard(newTrolley);
            oldCard.parentNode.replaceChild(newCard, oldCard)
        })

    document.getElementsByTagName("h3")[0].classList.toggle("hidden");
    toggleViews();
    clearEventListeners(document.getElementById("new_trolley_submit"))
}