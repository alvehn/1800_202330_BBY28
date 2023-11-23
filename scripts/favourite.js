
//----------------------------------------------------------
// This function is the only function that's called.
// This strategy gives us better control of the page.
//----------------------------------------------------------
function doAll() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      insertNameFromFirestore(user);
      getFavourites(user)
    } else {
      console.log("No user is signed in");
    }
  });
}
doAll();

//----------------------------------------------------------
// Wouldn't it be nice to see the User's Name on this page?
// Let's do it!  (Thinking ahead:  This function can be carved out, 
// and put into script.js for other pages to use as well).
//----------------------------------------------------------//----------------------------------------------------------
function insertNameFromFirestore(user) {
  db.collection("users").doc(user.uid).get().then(userDoc => {
    console.log(userDoc.data().name)
    userName = userDoc.data().name;
    console.log(userName)
    document.getElementById('name-goes-here').innerHTML = userName;
  })

}

//----------------------------------------------------------
// This function takes input param User's Firestore document pointer
// and retrieves the "saved" array (of bookmarks) 
// and dynamically displays them in the gallery
//----------------------------------------------------------
function getFavourites(user) {
  db.collection("users").doc(user.uid).get()
    .then(userDoc => {

      // Get the Array of bookmarks
      var favourites = userDoc.data().favourites;
      console.log(favourites);

      // Get pointer the new card template
      let newCardTemplate = document.getElementById("savedCardTemplate");

      // Iterate through the ARRAY of bookmarked hikes (document ID's)
      favourites.forEach(thisEventID => {
        console.log(thisEventID);
        db.collection("events").doc(thisEventID).get().then(doc => {
          var title = doc.data().name; // get value of the "name" key
          var description = doc.data().description;
          var date = doc.data().date.toDate();             //get value of "date"
          var location = doc.data().location;     //gets value of "location"
          var tags = doc.data().tags;

          var docID = doc.id;  //this is the autogenerated ID of the document

          //clone the new card
          // let newcard = neweventTemplate.content.cloneNode(true);
          let newcard = newCardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
          //update title and some pertinant information
          newcard.querySelector('.card-title').innerHTML = title;
          newcard.querySelector('.card-description').innerHTML = description;
          newcard.querySelector('.card-date').innerHTML = date;
          newcard.querySelector('.card-location').innerHTML = location;
          newcard.querySelector('.card-tags').innerHTML = tags;

          newcard.querySelector('a').href = "event.html?docID=" + docID;//button/read more
          // newcard.querySelector('i').id = 'save-' + docID;   //guaranteed to be unique
          // newcard.querySelector('i').onclick = () => updateFavourites(docID);

          // //NEW LINE: update to display length, duration, last updated
          // newcard.querySelector('.card-length').innerHTML =
          //   "Length: " + doc.data().length + " km <br>" +
          //   "Duration: " + doc.data().hike_time + "min <br>" +
          //   "Last updated: " + doc.data().last_updated.toDate().toLocaleDateString();

          // currentUser.get().then(userDoc => {
          //   let favourites = userDoc.data().favourites;
          //   if (favourites.includes(docID)) {
          //     document.getElementById('save-' + docID).innerText = ' added to favourites';
          //   } else {
          //     document.getElementById('save-' + docID).innerText = ' ';
          //   }
          // })
          //Finally, attach this new card to the gallery

          //fix
          let eventCard = document.getElementById("events-go-here");
          eventCard.appendChild(newcard);
        })
      });
    })

}

// function updateFavourites(eventDocID) {
//   currentUser.get().then(userDoc => {
//     let favourites = userDoc.data().favourites;
//     let iconID = 'save-' + eventDocID;
//     let isFavourited = favourites.includes(eventDocID);

//     if (isFavourited) {
//       currentUser.update({
//         favourites: firebase.firestore.FieldValue.arrayRemove(eventDocID)

//       }).then(() => {
//         console.log("favourites removed for " + eventDocID);
//         document.getElementById(iconID).innerText = ' unsaved';
//       });
//     } else {
//       currentUser.update({
//         favourites: firebase.firestore.FieldValue.arrayUnion(eventDocID)
//       }).then(() => {
//         console.log(eventDocID + " added to favourites");
//         document.getElementById(iconID).innerText = ' added to favourites';
//       });
//     }
//   });
// }