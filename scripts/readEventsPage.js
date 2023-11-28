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

function displayFullEvent() {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"

    db.collection("events")
        .doc(ID)
        .get()
        .then(doc => {
            //gets event creators latest name instead of outdated displayName
            console.log(doc.data().host);
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
                    var location = doc.data().location;     //gets value of "location"
                    var imageBad = doc.data().image;
                    var time = doc.data().time;
                    // var time = doc.data().time;
                    // var timeGood = formatAMPM("" + time);

                    var docID = doc.id;

                    // //formats date
                    // let dateBad = "" + date;
                    // var dateGood = dateBad.substring(0, 15);

                    // //formats location
                    // let locate = "" + location + ",";
                    // let s = "";
                    // let stringArray = [];
                    // for (const char of locate) {
                    //     if (char === ',') {
                    //         stringArray.push(s);
                    //         s = "";
                    //     } else {
                    //         s += char;
                    //     }
                    // }
                    // console.log(stringArray[0]);


                    // populates name, location, title, and description
                    document.getElementById("eventName").innerHTML = title;
                    document.getElementById("eventLocation").innerHTML = location;
                    document.getElementById("eventDescription").innerHTML = description;
                    document.getElementById("eventDateTime").innerHTML = date + " " + time;
                    document.getElementById("eventHost").innerHTML = eventCreator;

                    document.getElementById("eventImages").src = imageBad;

                    //checks if current user has made event; if true, it displays delete button for them, 
                    //else it hides the button to prevent deletion from user that has not made that event 
                    if (currentUserID === doc.data().host) {
                        document.getElementById("deleteEvent").onclick = () => deleteEvent(doc.id);
                        $("#deleteButton").show();
                    }

                })
        });


}

displayFullEvent();

// //formats the 24 time to 12 hour am/pm 
// function formatAMPM(date) {
//     var hours = parseInt(date.substring(0, 2)); //gets hour
//     var minutes = parseInt(date.substring(3, 5)); //gets minute
//     var ampm = hours >= 12 ? 'pm' : 'am'; 
//     hours = hours % 12;
//     hours = hours ? hours : 12; // the hour '0' should be '12'
//     minutes = minutes < 10 ? '0' + minutes : minutes;
//     var strTime = hours + ':' + minutes + ' ' + ampm;
//     return strTime;
// }

//confirms if user wants to delete event or not
function deleteEvent(eventid) {

    document.getElementById("deleteEvent").innerHTML = "Deleting...";
    db.collection("events").doc(eventid)
        .delete()
        .then(() => {
            console.log("1. Document deleted from Posts collection");
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
                console.log("2. post deleted from user doc");
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
        console.log("3. image deleted from storage");
        document.getElementById("deleteEvent").innerHTML = "Event Deleted";
        sleep(1200).then(() => { window.location.href = "profile.html"; });
    }).catch((error) => {
        console.log("Uh-Oh, " + error);
    });
}

//makes function wait when called
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}