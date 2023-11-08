function createEvent() {
    console.log("inside event creation");
    let eventNameCreation = document.getElementById("eventNameCreation").value;
    let eventDate = document.getElementById("eventDate").value;
    let eventDescription = document.getElementById("eventDescription").value;
    let eventImage = document.getElementById("eventImage").value;
    let eventLocation = document.querySelector("eventLocation").value;
    let flexCheckDefault = document.querySelector("flexCheckDefault").value;
    console.log(eventNameCreation, eventDate, eventDescription, eventImage, eventLocation, eventType);

    var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;

        // Get the document for the current user.
        db.collection("events").add({
            eventID: eventID,
            userID: userID,
            title: eventNameCreation,
            date: eventDate,
            description: eventDescription,
            image: eventImage,
            location: eventLocation,
            type: eventType,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })//.then(() => {
        //window.location.href = "thanks.html"; // Redirect to the thanks page
        //});
    } else {
        console.log("No user is signed in");
        // window.location.href = 'review.html';
    }
};

    

createEvent();
