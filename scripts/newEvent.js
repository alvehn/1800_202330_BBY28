
function postEvent() {
    var newEvent = db.collection("events").doc();
    var eventName = document.getElementById("eventCreationFrom").value;
    var description = document.getElementById("eventDescription").value;
    var date = document.getElementById("eventDate").value;
    var location = document.getElementById("eventLocation").value;

    db.collection("events").add({
        name: eventName,
        description: description,
        date: date,
        location: location
    })
    console.log(eventName, description);

}

