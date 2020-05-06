class Trolley {
    constructor(trolley) {
        this.id = trolley.id
        this.date = trolley.date;
        this.time = trolley.time;
        this.supermarket = trolley.supermarket;
        this.space = trolley.space;
        this.username = trolley.user.username;
        this.email = trolley.user.email;
        this.postcode = trolley.user.postcode;
        this.user_id = trolley.user_id;
        this.latitude = parseFloat(trolley.user.latitude);
        this.longitude = parseFloat(trolley.user.longitude);
    }

    get distance() {
        let R = 6371; // Radius of the earth in km
        let dLat = deg2rad(parseFloat(userObject.latitude) - this.latitude); // deg2rad in helpers
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