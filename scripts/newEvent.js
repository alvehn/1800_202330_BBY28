
function postEvent() {
    var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;
        // var newEvent = db.collection("events").doc();
        var eventName = document.getElementById("eventName").value;
        var description = document.getElementById("description").value;
        var date = document.getElementById("eventYear").value + "-" 
            + document.getElementById("eventMonth").value + "-"
            + document.getElementById("eventDay").value;
        
        var location = document.getElementById("locationOptions").value;

        console.log(eventName, description, date);

        db.collection("events").add({
            host: userID,
            name: eventName,
            description: description,
            date: new Date(date)
        });
    } else {
        console.log("No user is signed in");
    }

}

