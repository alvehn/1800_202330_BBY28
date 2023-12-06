var currentUser;
function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid); //global
        } else {
            // No user is signed in.
            console.log("No user is signed in");
            window.location.href = "login.html";
        }
    });
}
doAll();

// Collection parameter represents collection we are reading from
function eventCards(collection) {
    let cardTemplate = document.getElementById("eventCardTemplate"); // Retrieve the HTML element with the ID "eventCardTemplate" and store it in the cardTemplate variable.
    db.collection(collection).get()   //the collection called "events"
        .then(allEvents => {
            allEvents.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;                // get value of the "name" 
                var date = doc.data().date;             //get value of "date"
                var location = doc.data().location;     //gets value of "location"
                var coordinates = doc.data().coordinates
                var tags = doc.data().tags;
                var time = doc.data().time;
                var image = doc.data().image

                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                var docID = doc.id;//grab the id for that specific doc
                
                //fixes bug where it would not display events happening today
                var today = new Date();
                var eventDate = new Date(date);
                today.setHours(0);
                today.setMinutes(0);
                today.setSeconds(0);
                today.setDate(today.getDate() - 1);
                //update title and text and image
                if (new Date(date) >= today) {
                    newcard.querySelector('.card-title').innerHTML = title;
                    newcard.querySelector('.card-date').innerHTML = date + " " + time;
                    newcard.querySelector('.card-location').innerHTML = location;
                    newcard.querySelector('.card-coordinates').innerHTML = coordinates;
                    newcard.querySelector('.card-tags').innerHTML = tags;
                    newcard.querySelector('.card-image').src = image;

                    newcard.querySelector('a').href = "event.html?docID=" + docID;//button/read more
                    newcard.querySelector('i').id = 'save-' + docID;   //guaranteed to be unique
                    newcard.querySelector('i').onclick = () => updateFavourites(docID);

                    currentUser.get().then(userDoc => {
                        let favourites = userDoc.data().favourites;
                        if (favourites.includes(docID)) {
                            document.getElementById('save-' + docID).className = 'bi-heart-fill';
                        } else {
                            document.getElementById('save-' + docID).className = 'bi-heart';
                        }
                    })

                    //attach to gallery
                    document.getElementById(collection + "-go-here").appendChild(newcard);
                }

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
                document.getElementById(iconID).className = 'bi-heart';
            });
        } else {
            currentUser.update({
                favourites: firebase.firestore.FieldValue.arrayUnion(eventDocID)
            }).then(() => {
                document.getElementById(iconID).className = 'bi-heart-fill';
            });
        }
    });
}



