
function postEvent() {
    var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userName =  user.displayName;
        var userID = user.uid;
        // var newEvent = db.collection("events").doc();
        var eventName = document.getElementById("eventName").value;
        var description = document.getElementById("description").value;
        var date = document.getElementById("eventYear").value + "-" 
            + document.getElementById("eventMonth").value + "-"
            + document.getElementById("eventDay").value;
        var imageBad = document.getElementById("eventImages").value;
        var imageGood = imageBad.slice(12, imageBad.length);
        // console.log(userName);

        var locationOfEvent = document.getElementById("eventLocation").value;

        console.log(eventName, description, date);

        db.collection("events").add({
            host: userID,
            hostName: userName,
            name: eventName,
            description: description,
            date: new Date(date),
            image: imageGood,
            location: locationOfEvent
        });
    } else {
        console.log("No user is signed in");
    }

}

