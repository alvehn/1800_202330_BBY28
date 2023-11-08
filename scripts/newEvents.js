function createEvent() {
    console.log("inside event creation");
    let eventNameCreation = document.getElementById("title").value;
    let eventDate = document.getElementById("date").value;
    let eventDescription = document.getElementById("description").value;
    let eventImage = document.getElementById("image").value;
    let eventLocation = document.querySelector("location").value;
    let eventType = document.querySelector("tags").value;

    };

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
        }).then(() => {
            window.location.href = "thanks.html"; // Redirect to the thanks page
        });
    } else {
        console.log("No user is signed in");
        window.location.href = 'review.html';
    }
