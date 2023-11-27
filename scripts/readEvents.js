//USE FUNCTION THATS COMMENTED OUT BELOW FOR USER PROFILE PAGE
var currentUser;

function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid); //global
            console.log(currentUser);

            // figure out what day of the week it is today
            // const weekday = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
            // const d = new Date();
            // let day = weekday[d.getDay()];

            // the following functions are always called when someone is logged in
            // readQuote(day);
            // insertNameFromFirestore();
            // displayCardsDynamically("hikes");
        } else {
            // No user is signed in.
            console.log("No user is signed in");
            window.location.href = "login.html";
        }
    });
}
doAll();

//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------

function eventCards(collection) {
    let cardTemplate = document.getElementById("eventCardTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable.
    db.collection(collection).get()   //the collection called "hikes"
        .then(allEvents => {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allEvents.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;                // get value of the "name" 
                var description = doc.data().description; //get value of the "description"
                var date = doc.data().date.toDate();             //get value of "date"
                var location = doc.data().location;     //gets value of "location"
                var coordinates = doc.data().coordinates
                var tags = doc.data().tags;
                // var favourited = doc.data().favourited;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                var docID = doc.id;//grab the id for that specific doc


                //update title and text and image
                if (date >= new Date()) {
                    newcard.querySelector('.card-title').innerHTML = title;
                    newcard.querySelector('.card-date').innerHTML = date;
                    newcard.querySelector('.card-location').innerHTML = location;
                    newcard.querySelector('.card-coordinates').innerHTML = coordinates;
                    newcard.querySelector('.card-description').innerHTML = description;
                    newcard.querySelector('.card-tags').innerHTML = tags;

                    newcard.querySelector('a').href = "event.html?docID=" + docID;//button/read more
                    newcard.querySelector('i').id = 'save-' + docID;   //guaranteed to be unique
                    newcard.querySelector('i').onclick = () => updateFavourites(docID);
                

                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                currentUser.get().then(userDoc => {
                    let favourites = userDoc.data().favourites;
                    if (favourites.includes(docID)) {
                        document.getElementById('save-' + docID).innerText = ' added to favourites';
                        // document.querySelector('.bi-heart').classList.
                    } else {
                        document.getElementById('save-' + docID).innerText = ' ';
                    }
                })

                //attach to gallery, Example: "hikes-go-here"s
                document.getElementById(collection + "-go-here").appendChild(newcard);
            }

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

eventCards("events");  //input param is the name of the collection

function updateFavourites(eventDocID) {
    currentUser.get().then(userDoc => {
        let favourites = userDoc.data().favourites;
        let iconID = 'save-' + eventDocID;
        let isFavourited = favourites.includes(eventDocID);

        if (isFavourited) {
            currentUser.update({
                favourites: firebase.firestore.FieldValue.arrayRemove(eventDocID)

            }).then(() => {
                console.log("favourites removed for " + eventDocID);
                document.getElementById(iconID).innerText = ' unsaved';
            });
        } else {
            currentUser.update({
                favourites: firebase.firestore.FieldValue.arrayUnion(eventDocID)
            }).then(() => {
                console.log(eventDocID + " added to favourites");
                document.getElementById(iconID).innerText = ' added to favourites';
            });
        }
    });
}



