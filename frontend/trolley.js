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