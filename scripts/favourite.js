
// function favouritedEvent() {
//     let params = new URL(window.location.href); //get URL of search bar
//     console.log(params);
//     let ID = params.searchParams.get("docID"); //get value for key "id"
//     console.log(ID);

//     // doublecheck: is your collection called "Reviews" or "reviews"?
//     db.collection("favourites")
//         .doc(ID)
//         .get()
//         .then(doc => {
//             var title = doc.data().name;                // get value of the "name" 
//             var description = doc.data().description; //get value of the "description"
//             var date = doc.data().date.toDate();             //get value of "date"
//             var location = doc.data().location;     //gets value of "location"
//             var image = doc.data().image;

//             // populates name, location, title, and description
//             document.getElementById("eventName").innerHTML = title;
//             document.getElementById("eventLocation").innerHTML = location;
//             document.getElementById("eventDescription").innerHTML = description;
//             document.getElementById("eventDateTime").innerHTML = date;
//             // document.getElementById("eventImages").
//             let imgEvent = document.getElementById( "eventImages" );
//             imgEvent.src = "../images/" + image;

//             // let imgEvent = document.querySelector( ".hike-img" );
//             // imgEvent.src = "../images/" + hikeCode + ".jpg";
//         });
// }
// favouritedEvent();

// let eventFavourited = document.querySelector('input[name="favourited"]:checked').value;

// console.log(hikeTitle, hikeLevel, hikeSeason, hikeDescription, hikeFlooded, hikeScrambled, hikeRating);

//     var user = firebase.auth().currentUser;
//     if (user) {
//         var currentUser = db.collection("users").doc(user.uid);
//         var userID = user.uid;

//         // Get the document for the current user.
//         db.collection("reviews").add({
//             hikeDocID: hikeDocID,
//             userID: userID,
//             title: hikeTitle,
//             level: hikeLevel,
//             season: hikeSeason,
//             description: hikeDescription,
//             flooded: hikeFlooded,
//             scrambled: hikeScrambled,
//             rating: hikeRating, // Include the rating in the review
//             timestamp: firebase.firestore.FieldValue.serverTimestamp()
//         }).then(() => {
//             window.location.href = "thanks.html"; // Redirect to the thanks page
//         });
//     } else {
//         console.log("No user is signed in");
//         window.location.href = 'review.html';
//     }


// var x = document.getElementById("btn-check-3-outlined").value;

// function favouritedEvent() {
//     // Get the checkbox
//     var checkBox = document.getElementById("btn-check-3-outlined");
//     // Get the output text
//     // var text = document.getElementById("text");

//     // If the checkbox is checked, display the output text
//   if (checkBox.checked == true){
//     display = 
//   //   let params; = new URL(window.location.href); //get URL of search bar
//   // console.log(params);
//   // let ID = params.searchParams.get("docID"); //get value for key "id"
//   // console.log(ID);

//   // doublecheck: is your collection called "Reviews" or "reviews"?
//   db.collection("favourites")
//       .doc(ID)
//       .get()
//       .then(doc => {
//           var title = doc.data().name;                // get value of the "name" 
//           var description = doc.data().description; //get value of the "description"
//           var date = doc.data().date.toDate();             //get value of "date"
//           var location = doc.data().location;     //gets value of "location"
//           var image = doc.data().image;

//           populates name, location, title, and description
//           document.getElementById("eventName").innerHTML = title;
//           document.getElementById("eventLocation").innerHTML = location;
//           document.getElementById("eventDescription").innerHTML = description;
//           document.getElementById("eventDateTime").innerHTML = date;
//           // document.getElementById("eventImages").
//           let imgEvent = document.getElementById( "eventImages" );
//           imgEvent.src = "../images/" + image;

//           // let imgEvent = document.querySelector( ".hike-img" );
//           // imgEvent.src = "../images/" + hikeCode + ".jpg";
//       });
//   } else {
//     display = "none";
//   }
// }

// Retrieve checkbox state from localStorage
// var checkBoxState = localStorage.getItem("checkBoxState");

//   // Display content if the checkbox is checked
//   if (checkBox.checked == true){
//   //   display = 
//   //   let params; = new URL(window.location.href); //get URL of search bar
//   // console.log(params);
//   // let ID = params.searchParams.get("docID"); //get value for key "id"
//   // console.log(ID);

//   // doublecheck: is your collection called "Reviews" or "reviews"?
//   db.collection("favourites")
//       .doc(ID)
//       .get()
//       .then(doc => {
//           var ref = doc.data().liked_events;                // get value of the "name" 
//           // var description = doc.data().description; //get value of the "description"
//           // var date = doc.data().date.toDate();             //get value of "date"
//           // var location = doc.data().location;     //gets value of "location"
//           // var image = doc.data().image;

//           // populates name, location, title, and description
//           document.getElementById("eventName").innerHTML = title;
//           document.getElementById("eventLocation").innerHTML = location;
//           document.getElementById("eventDescription").innerHTML = description;
//           document.getElementById("eventDateTime").innerHTML = date;
//           // document.getElementById("eventImages").
//           let imgEvent = document.getElementById( "eventImages" );
//           imgEvent.src = "../images/" + image;

//           // let imgEvent = document.querySelector( ".hike-img" );
//           // imgEvent.src = "../images/" + hikeCode + ".jpg";
//       });
//   } else {
//     display = "none";
//   }

// function addFavouite() {
//     var user = firebase.auth().currentUser;
//     if (user) {
//         // var currentUser = db.collection("favourites").doc(user.uid);
//         var userID = user.uid;
//         var eventIsFavourited = document.querySelector('input[name="favourited"]:checked').value;
//         let params = new URL(window.location.href); //get URL of search bar
//         let ID = params.searchParams.get("docID"); //get value for key "id"
//         console.log(ID);

//         db.collection("users").doc(userID).collection('savedEvents').add({
//             eventID : ID
//         });
//     } else {
//         console.log("No user is signed in");
//     }
//   }


//----------------------------------------------------------
// This function is the only function that's called.
// This strategy gives us better control of the page.
//----------------------------------------------------------
// function doAll() {
//   firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//       insertNameFromFirestore(user);
//       getBookmarks(user)
//     } else {
//       console.log("No user is signed in");
//     }
//   });
// }
// doAll();

//----------------------------------------------------------
// Wouldn't it be nice to see the User's Name on this page?
// Let's do it!  (Thinking ahead:  This function can be carved out, 
// and put into script.js for other pages to use as well).
//----------------------------------------------------------//----------------------------------------------------------
// function insertNameFromFirestore(user) {
//   db.collection("users").doc(user.uid).get().then(userDoc => {
//     console.log(user.displayName);  //print the user name in the browser console
//     userName = user.displayName;

//     if (userName != null) {
//       document.getElementById("nameInput").value = userName;
//     }
//   })

// }

//----------------------------------------------------------
// This function takes input param User's Firestore document pointer
// and retrieves the "saved" array (of bookmarks) 
// and dynamically displays them in the gallery
//----------------------------------------------------------

// function getBookmarks(user) {
//   db.collection("users").doc(user.uid).get()
//     .then(userDoc => {

//       // Get the Array of bookmarks
//       var bookmarks = userDoc.data().bookmarks;
//       console.log(bookmarks);

//       // Get pointer the new card template
//       let newcardTemplate = document.getElementById("savedCardTemplate");

//       // Iterate through the ARRAY of bookmarked hikes (document ID's)
//       bookmarks.forEach(thisEventID => {
//         console.log(thisEventID);
//         db.collection("event").doc(thisEventID).get().then(doc => {
//           var title = doc.data().name;                // get value of the "name" 
//           var description = doc.data().description; //get value of the "description"
//           var date = doc.data().date.toDate();             //get value of "date"
//           var location = doc.data().location;     //gets value of "location"
//           var tags = doc.data().tags;


//           var docID = doc.id;//grab the id for that specific doc


//           //clone the new card
//           let newcard = newcardTemplate.content.cloneNode(true);

//           //update title and some pertinant information
//           newcard.querySelector('.card-title').innerHTML = title;
//           newcard.querySelector('.card-date').innerHTML = date;
//           newcard.querySelector('.card-location').innerHTML = location;
//           newcard.querySelector('.card-description').innerHTML = description;
//           newcard.querySelector('.card-tags').innerHTML = tags;

//           newcard.querySelector('a').href = "event.html?docID=" + docID;//button/read more

//           //Finally, attach this new card to the gallery
//           document.getElementById(collection + "-go-here").appendChild(newcard);
//         })
//       });
//     })
// }

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
      let newCardTemplate = document.getElementById("savedEventTemplate");

      // Iterate through the ARRAY of bookmarked hikes (document ID's)
      favourites.forEach(thisEventID => {
        console.log(thisEventID);
         db.collection("events").doc(thisEventID).get().then(doc => {
          console.log(thisEventID);
          var title = doc.data().name; // get value of the "name" key
          var date = doc.data().date.toDate();             //get value of "date"
          var location = doc.data().location;     //gets value of "location"
          var tags = doc.data().tags;
          var description = doc.data().description; //gets the length field
          var docID = doc.id;  //this is the autogenerated ID of the document

          //clone the new card
          // let newcard = neweventTemplate.content.cloneNode(true);
          let newcard = newcardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
          //update title and some pertinant information
          newcard.querySelector('.card-title').innerHTML = title;
          newcard.querySelector('.card-date').innerHTML = date;
          newcard.querySelector('.card-location').innerHTML = location;
          newcard.querySelector('.card-description').innerHTML = description;
          newcard.querySelector('.card-tags').innerHTML = tags;

          newcard.querySelector('a').href = "event.html?docID=" + docID;//button/read more

          // //NEW LINE: update to display length, duration, last updated
          // newcard.querySelector('.card-length').innerHTML =
          //   "Length: " + doc.data().length + " km <br>" +
          //   "Duration: " + doc.data().hike_time + "min <br>" +
          //   "Last updated: " + doc.data().last_updated.toDate().toLocaleDateString();

          //Finally, attach this new card to the gallery

          //fix
          let eventCard = document.getElementById("events-go-here");
          eventCard.appendChild(newcard);
        })
      });
    })

}