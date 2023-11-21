
function displayFullEvent() {
    let params = new URL(window.location.href); //get URL of search bar
    // console.log(params);
    let ID = params.searchParams.get("docID"); //get value for key "id"
    // console.log(ID);

    // doublecheck: is your collection called "Reviews" or "reviews"?
    
    db.collection("events")
        .doc(ID)
        .get()
        .then(doc => {
            console.log(doc.data().host);
            var eventCreator;
            db.collection("users")
            .doc(doc.data().host)
            .get()
            .then ( userStuff => {
                eventCreator = userStuff.data().name;
            }).then( () => {

            var title = doc.data().name;                // get value of the "name" 
            var description = doc.data().description; //get value of the "description"
            var date = doc.data().date.toDate();             //get value of "date"
            var location = doc.data().location;     //gets value of "location"
            var imageBad = doc.data().image;
            // console.log(imageBad);
            // var image = URL.createObjectURL(imageBad);
            // console.log(image);
            var docID = doc.id;
            var count = doc.data().count;



            // populates name, location, title, and description
            document.getElementById("eventName").innerHTML = title;
            document.getElementById("eventLocation").innerHTML = location;
            document.getElementById("eventDescription").innerHTML = description;
            document.getElementById("eventDateTime").innerHTML = date;
            document.getElementById("eventHost").innerHTML = eventCreator;
            // document.querySelector('i').id = 'save-' + docID;   //guaranteed to be unique
            // document.querySelector('i').onclick = () => saveBookmark(eventID);
            // document.getElementById("eventImages").
            document.getElementById("eventImages").src = imageBad;
            document.getElementById("eventCount").innerHTML = count;

            // currentUser.get().then(userDoc => {
            //     //get the user name
            //     var bookmarks = userDoc.data().bookmarks;
            //     if (bookmarks.includes(docID)) {
            //         document.getElementById('save-' + docID).innerText = 'bookmark';
            //     }
            // })

            // let imgEvent = document.querySelector( ".hike-img" );
            // imgEvent.src = "../images/" + hikeCode + ".jpg";
        })
    });
}
displayFullEvent();


// function saveCheckboxState() {
//     var checkBox = document.getElementById("btn-check-3-outlined");
//     var isChecked = checkBox.checked;

//     // Save checkbox state to localStorage
//     localStorage.setItem("checkBoxState", isChecked);
// }

// function saveBookmark(eventID) {
//     // Manage the backend process to store the hikeDocID in the database, recording which hike was bookmarked by the user.
//     currentUser.update({
//         // Use 'arrayUnion' to add the new bookmark ID to the 'bookmarks' array.
//         // This method ensures that the ID is added only if it's not already present, preventing duplicates.
//         bookmarks: firebase.firestore.FieldValue.arrayUnion(eventID)
//     })
//         // Handle the front-end update to change the icon, providing visual feedback to the user that it has been clicked.
//         .then(function () {
//             console.log("bookmark has been saved for" + eventID);
//             var iconID = 'save-' + eventID;
//             //console.log(iconID);
//             //this is to change the icon of the hike that was saved to "filled"
//             document.getElementById(iconID).innerText = 'bookmark';
//         });
// }