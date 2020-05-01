let allTrolleys = [] // A place to keep all of the Trolley objects once created.
let toggle = 0 // The counter for toggling the card colours
let userObject // Where the object for the current user is stored

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

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

function domDeleteTrolley(trolley) {
    document.getElementById(trolley.id).remove()
}

//////////////helpers for hiding/showing elements, could these be combined into one that toggles?//
function hideForm(form) {
    form.classList.add("hidden")
}

function showForm(form) {
    form.classList.remove("hidden")
}
///////////////////////////////////////////////////////////////////////////////////////////////////

//helper methods for sorting selection - very similar? Could be combined??////////////////////////////////////////////
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

function allsortedbysupermarket() {
    return allTrolleys.sort(function(a, b) {
        var thingA = a.supermarket;
        var thingB = b.supermarket;
        return (thingA < thingB) ? -1 : (thingA > thingB) ? 1 : 0;
    })
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function clearEventListeners(old_element) {
    let new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element)
}