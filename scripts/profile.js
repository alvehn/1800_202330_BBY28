

// function displayUser() {
//     let params = new URL(window.location.href); //get URL of search bar
//     console.log(params);
//     let ID = params.searchParams.get("docID"); //get value for key "id"
//     console.log(ID);

//     db.collection("users")
//         .doc(ID)
//         .get()
//         .then(doc => {
//             var userName = doc.data().name;                // get value of the "name" 

//             // populates name
//             document.getElementById("name-goes-here").innerText = userName;  

//             // let imgEvent = document.querySelector( ".hike-img" );
//             // imgEvent.src = "../images/" + hikeCode + ".jpg";
//         });
// }
// displayUser();

// function getNameFromAuth() {
//     firebase.auth().onAuthStateChanged(user => {
//         // Check if a user is signed in:
//         if (user) {
//             // Do something for the currently logged-in user here: 
//             console.log(user.uid); //print the uid in the browser console
//             console.log(user.displayName);  //print the user name in the browser console
//             userName = user.displayName;

//             //method #1:  insert with JS
//             document.getElementById("name-goes-here").innerText = userName;    

//             //method #2:  insert using jquery
//             //$("#name-goes-here").text(userName); //using jquery

//             //method #3:  insert using querySelector
//             //document.querySelector("#name-goes-here").innerText = userName

//         } else {
//             // No user is signed in.
//         }
//     });
// }
//getNameFromAuth();

var currentUser;               //points to the document of the user who is logged in
function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    // var userName = userDoc.data().name;
                    console.log(user.displayName);  //print the user name in the browser console
                    userName = user.displayName;

                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }

                    // document.getElementById("name-goes-here").innerText = userName;


                    //if the data fields are not empty, then write them in to the form.

                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

//call the function to run it 
populateUserInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    //enter code here

    userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"


    currentUser.update({
        name: userName,
    })
        .then(() => {
            console.log("Document successfully updated!");
        })

    document.getElementById('personalInfoFields').disabled = true;
}


//From TechTip B01b COMP1800
//-------------------------------------------------
// this function shows finds out who is logged in,
// reads the "myposts" field (an array) for that user, 
// reads the details for each item in the array
// and displays a card for each item. 
//------------------------------------------------
function populateMyEvents() {
    firebase.auth().onAuthStateChanged(user => {
        console.log("user is: " + user.uid);
        db.collection("users").doc(user.uid)
            .get()
            .then(doc => {
                myEvents = doc.data().myEvents; //get array of my posts
                console.log(myEvents);
                myEvents.forEach(item => {
                    db.collection("events")
                        .doc(item)
                        .get()
                        .then(doc => {
                            displayMyEventCards(doc, myEvents);
                        })
                })
            })
    })
}
populateMyEvents();

function displayMyEventCards(doc, docID) {
    let cardTemplate = document.getElementById("eventCardTemplate"); // Retrieve the HTML element with the ID "eventCardTemplate" and store it in the cardTemplate variable.
    var title = doc.data().name;                // get value of the "name" 
    var description = doc.data().description; //get value of the "description"
    var date = doc.data().date.toDate();             //get value of "date"
    var location = doc.data().location;     //gets value of "location"
    var tags = doc.data().tags;
    // var favourited = doc.data().favourited;
    let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

    // var docID = doc;//grab the id for that specific doc
    // console.log(docID);


    //update title and text and image
    newcard.querySelector('.card-title').innerHTML = title;
    newcard.querySelector('.card-date').innerHTML = date;
    newcard.querySelector('.card-location').innerHTML = location;
    newcard.querySelector('.card-description').innerHTML = description;
    newcard.querySelector('.card-tags').innerHTML = tags;

    newcard.querySelector('a').href = "event.html?docID=" + docID;//button/read more
    newcard.querySelector('i').id === 'save-' + docID;   //guaranteed to be unique
    newcard.querySelector('i').onclick = () => saveBookmark(docID);

    //attach to gallery, Example: "hikes-go-here"
    document.getElementById("events-go-here").appendChild(newcard);

    //i++;   //Optional: iterate variable to serve as unique ID


}