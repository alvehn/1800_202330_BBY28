
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

function addFavouite() {
    var user = firebase.auth().currentUser;
    if (user) {
        // var currentUser = db.collection("favourites").doc(user.uid);
        // var userID = user.uid;
        var eventIsFavourited = document.querySelector('input[name="favourited"]:checked').value;
        var newEvent = db.collection("events").doc();
        // console.log(favourited);

        db.collection("favourites").add({
            favourited: eventIsFavourited,
            liked_events: newEvent,
        });
    } else {
        console.log("No user is signed in");
    }
  }
