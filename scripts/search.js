function eventCardsSearch(collection) {
    let cardTemplate = document.getElementById("eventCardTemplate"); // Retrieve the HTML element with the ID "eventCardTemplate" and store it in the cardTemplate variable.
    let searchQuery = document.getElementById("searchField").value;
    // console.log(searchQuery);

    //taken from https://www.educative.io/answers/how-to-trigger-the-enter-key-on-keyboard-with-js
    //checks if key is entered and uses keycode to check if enter key (13) is entered
    document.addEventListener('keypress', (event) => {

        // event.keyCode or event.which  property will have the code of the pressed key
        let keyCode = event.keyCode ? event.keyCode : event.which;

        // 13 points is the enter key
        if (keyCode === 13) {
            db.collection("events").get()   //the collection called "events"
                .then(allEvents => {
                    //var i = 1;  //Optional: if you want to have a unique ID for each hike
                    allEvents.forEach(doc => { //iterate thru each doc
                        var title = doc.data().name;                // get value of the "name" 
                        if (title === searchQuery) {
                            var description = doc.data().description; //get value of the "description"
                            var date = doc.data().date.toDate();             //get value of "date"
                            var location = doc.data().location;     //gets value of "location"
                            var tags = doc.data().tags;
                            let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                            var docID = doc.id;//grab the id for that specific doc

                            // update title and text and image
                            newcard.querySelector('.card-title').innerHTML = title;
                            newcard.querySelector('.card-date').innerHTML = date;
                            newcard.querySelector('.card-location').innerHTML = location;
                            newcard.querySelector('.card-description').innerHTML = description;
                            newcard.querySelector('.card-tags').innerHTML = tags;

                            newcard.querySelector('a').href = "event.html?docID=" + docID;//button/read more

                            document.getElementById(collection + "-go-here").appendChild(newcard);
                        }

                    })
                })
        }

    });
}

