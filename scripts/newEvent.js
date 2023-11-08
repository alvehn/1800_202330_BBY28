
function postEvent() {
    // var newEvent = db.collection("events").doc();
    var eventName = document.getElementById("eventName").value;
    var description = document.getElementById("description").value;
    var date = document.getElementById("eventDate").value;
    var location = document.getElementById("eventLocation").value;

    console.log(eventName, description);

    db.collection("events").add({
        name: eventName,
        description: description
    });
    

}

