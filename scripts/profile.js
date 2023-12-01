$("#profileImageButton").hide();
$("#saveButton").hide();
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
                    console.log(user.displayName);  //print the user name in the browser console
                    userName = userDoc.data().name;
                    userImage = userDoc.data().profilePic;

                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                        document.getElementById("profileImageSelected").src = userImage;
                    }

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
    $("#profileImageButton").show();
    $("#saveButton").show();
}

function saveUserInfo() {
    $("#profileImageButton").hide();
    $("#saveButton").hide();

    userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
    uploadPic(currentUser.id);

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
                let i = -1;
                myEvents.forEach(item => {
                    db.collection("events")
                        .doc(item)
                        .get()
                        .then(doc => {
                            i++;
                            displayMyEventCards(doc, item, i);
                        })
                        
                })
            })
    })
}
populateMyEvents();

function displayMyEventCards(doc, docID, i) {
    let cardTemplate = document.getElementById("eventCardTemplate"); // Retrieve the HTML element with the ID "eventCardTemplate" and store it in the cardTemplate variable.
    var title = doc.data().name;                // get value of the "name" 
    var date = doc.data().date;             //get value of "date"
    var location = doc.data().location;     //gets value of "location"
    var tags = doc.data().tags;
    var time = doc.data().time;
    var image = doc.data().image;
    var newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.


    //update title and text and image
    newcard.querySelector('.card-title').innerHTML = title;
    newcard.querySelector('.card-date').innerHTML = date + " " + time;
    newcard.querySelector('.card-location').innerHTML = location;
    newcard.querySelector('.card-image').src = image;
    newcard.querySelector('.card-tags').innerHTML = tags;

    newcard.querySelector('a').href = "event.html?docID=" + docID;//button/read more
    newcard.querySelector('i').id === 'save-' + docID;   //guaranteed to be unique
    newcard.querySelector('i').onclick = () => saveBookmark(docID);

    //attach to gallery
    document.getElementById("events-go-here").appendChild(newcard);
    //fixes bug where it would not display events happening today
    var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setDate(today.getDate() - 1);
    console.log("i is " + i);
    //update title and text and image
    if (new Date(date) < today) {
        var titleStyle = document.querySelectorAll(".card-title");
        titleStyle.item(i).style.opacity = "60%";
        var tagStyle = document.querySelectorAll(".card-tags");
        tagStyle.item(i).style.opacity = "60%";
        var locationStyle = document.querySelectorAll(".card-location");
        locationStyle.item(i).style.opacity = "60%";
        var imagesStyle = document.querySelectorAll(".card-image");
        imagesStyle.item(i).style.opacity = "60%";
        var dateStyle = document.querySelectorAll(".card-date");
        dateStyle.item(i).style.color = "red";
        

    }



}

var ImageFile;
function listenFileSelect() {
    // listen for file selection
    var fileInput = document.getElementById("profileImage"); 

    // When a change happens to the File Chooser Input
    fileInput.addEventListener('change', function (e) {
        ImageFile = e.target.files[0];   //Global variable
        var blob = URL.createObjectURL(ImageFile);
        console.log(blob);
    })
}
listenFileSelect();



//From TechTip B01a COMP 1800
//------------------------------------------------
// So, a new post document has just been added
// and it contains a bunch of fields.
// We want to store the image associated with this post,
// such that the image name is the postid (guaranteed unique).
// 
// This function is called AFTER the post has been created, 
// and we know the post's document id.
//------------------------------------------------
function uploadPic(profilePicID) {
    console.log("inside uploadPic " + profilePicID);
    var storageRef = storage.ref("profile/" + profilePicID + ".jpg");
    console.log(storageRef);

    storageRef.put(ImageFile)   //global variable ImageFile

        // AFTER .put() is done
        .then(function () {
            console.log('2. Uploaded to Cloud Storage.');
            storageRef.getDownloadURL()

                // AFTER .getDownloadURL is done
                .then(function (url) { // Get URL of the uploaded file
                    console.log("3. Got the download URL.");

                    // Now that the image is on Storage, we can go back to the
                    // post document, and update it with an "image" field
                    // that contains the url of where the picture is stored.
                    db.collection("users").doc(profilePicID).update({
                        profilePic: url // Save the URL into users collection
                    })
                        // AFTER .update is done
                        .then(function () {
                            console.log('4. Added pic URL to Firestore.');
                        })
                })
        })
        .catch((error) => {
            console.log("error uploading to cloud storage");
        })
}