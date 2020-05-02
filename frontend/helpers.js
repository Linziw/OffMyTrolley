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

function allsortedby(sortOption) {
    return allTrolleys.sort(function(a, b) {
        var thingA = a[sortOption];
        var thingB = b[sortOption];
        return (thingA < thingB) ? -1 : (thingA > thingB) ? 1 : 0;
    })
}

function clearEventListeners(old_element) {
    let new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element)
}