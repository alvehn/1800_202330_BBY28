//stores current users document id
var currentUserID;
$("#deleteButton").hide();

//gets user id that will be compared to user id stored in event doc
function getCurrentUser() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            currentUserID = user.uid;
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}
getCurrentUser();

var currentUser;

function doAll() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid);
      displayFullEvent(user);
    } else {
      console.log("No user is signed in");
    }
  });
}
doAll();

function displayFullEvent() {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"

    db.collection("events")
        .doc(ID)
        .get()
        .then(doc => {
            //gets event creators latest name instead of outdated displayName
            var eventCreator;
            db.collection("users")
                .doc(doc.data().host)
                .get()
                .then(userStuff => {
                    eventCreator = userStuff.data().name;
                }).then(() => {

                    var title = doc.data().name;                // get value of the "name" 
                    var description = doc.data().description; //get value of the "description"
                    var date = doc.data().date;             //get value of "date"
                    var location = doc.data().locationRaw;     //gets value of "location"
                    var imageBad = doc.data().image;
                    var time = doc.data().time;
                    var docID = doc.id;
                    
                    // populates name, location, title, and description
                    document.getElementById("eventName").innerHTML = title;
                    document.getElementById("eventLocation").innerHTML = location;
                    document.getElementById("eventDescription").innerHTML = description;
                    document.getElementById("eventDateTime").innerHTML = date + " " + time;
                    document.getElementById("eventHost").innerHTML = eventCreator;
                    document.querySelector('i').id = 'save-' + docID;   //guaranteed to be unique
                    document.querySelector('i').onclick = () => updateFavourites(docID);

                    document.getElementById("eventImages").src = imageBad;

            
                    //checks if current user has made event; if true, it displays delete button for them, 
                    //else it hides the button to prevent deletion from user that has not made that event 
                    if (currentUserID === doc.data().host) {
                        document.getElementById("deleteEvent").onclick = () => deleteEvent(doc.id);
                        $("#deleteButton").show();
                    }

                    currentUser.get().then(userDoc => {
                        let favourites = userDoc.data().favourites;
                        if (favourites.includes(docID)) {
                            document.getElementById('save-' + docID).innerText = ' added to favourites';
                        } else {
                            document.getElementById('save-' + docID).innerText = ' ';
                        }
                    })

                })
        });
    

}

displayFullEvent();

//confirms if user wants to delete event or not
function deleteEvent(eventid) {

    document.getElementById("deleteEvent").innerHTML = "Deleting...";
    db.collection("events").doc(eventid)
        .delete()
        .then(() => {
            deleteFromMyEvents(eventid);
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
}

//goes into users myEvents array and deletes the specified event using the event doc id
function deleteFromMyEvents(eventid) {
    firebase.auth().onAuthStateChanged(user => {
        db.collection("users").doc(user.uid).update({
            myEvents: firebase.firestore.FieldValue.arrayRemove(eventid)
        })
            .then(() => {
                deleteFromStorage(eventid);
            })
    })
}

//deletes the image from firestore cloud using event doc id to find image
function deleteFromStorage(eventid) {
    // Create a reference to the file to delete
    var imageRef = storage.ref('images/' + eventid + '.jpg');

    // Delete the file
    imageRef.delete().then(() => {
        // File deleted successfully
        deleteFromFavourites(eventid);
        document.getElementById("deleteEvent").innerHTML = "Event Deleted";
        sleep(1200).then(() => { window.location.href = "profile.html"; });
    }).catch((error) => {
        console.log("Error: " + error);
    });
}

function deleteFromFavourites(eventid) {
    db.collection("users").get()
    .then(users =>{
        users.forEach(user => {
            fav = user.data().favourites;
            for (let i = 0; i < fav.length; i++){
                if (fav[i] === eventid) {
                    fav.splice(i, 1);
                    db.collection("users")
                    .doc(user.id)
                    .update({
                        favourites: fav
                    })
                }
            }
        })
    })
    
}

//from https://www.sitepoint.com/delay-sleep-pause-wait/
//makes function wait when called
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateFavourites(eventDocID) {
    currentUser.get().then(userDoc => {
        let favourites = userDoc.data().favourites;
        let iconID = 'save-' + eventDocID;
        let isFavourited = favourites.includes(eventDocID);

        if (isFavourited) {
            currentUser.update({
                favourites: firebase.firestore.FieldValue.arrayRemove(eventDocID)

            }).then(() => {
                document.getElementById(iconID).innerText = ' unsaved';
            });
        } else {
            currentUser.update({
                favourites: firebase.firestore.FieldValue.arrayUnion(eventDocID)
            }).then(() => {
                document.getElementById(iconID).innerText = ' added to favourites';
            });
        }
    });
}