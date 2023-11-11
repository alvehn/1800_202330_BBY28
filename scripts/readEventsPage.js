function displayFullEvent() {
    let params = new URL(window.location.href); //get URL of search bar
    console.log(params);
    let ID = params.searchParams.get("docID"); //get value for key "id"
    console.log(ID);

    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection("events")
        .doc(ID)
        .get()
        .then(doc => {
            var title = doc.data().name;                // get value of the "name" 
            var description = doc.data().description; //get value of the "description"
            var date = doc.data().date.toDate();             //get value of "date"
            var location = doc.data().location;     //gets value of "location"
            var image = doc.data().image;
            var eventCreator = doc.data().hostName;

            // populates name, location, title, and description
            document.getElementById("eventName").innerHTML = title;
            document.getElementById("eventLocation").innerHTML = location;
            document.getElementById("eventDescription").innerHTML = description;
            document.getElementById("eventDateTime").innerHTML = date;
            document.getElementById("eventHost").innerHTML = eventCreator;
            // document.getElementById("eventImages").
            let imgEvent = document.getElementById( "eventImages" );
            imgEvent.src = "../images/" + image;

            // let imgEvent = document.querySelector( ".hike-img" );
            // imgEvent.src = "../images/" + hikeCode + ".jpg";
        });
}
displayFullEvent();