
var ImageFile;
function listenFileSelect() {
    // listen for file selection
    var fileInput = document.getElementById("eventImages"); // pointer #1
    //   const image = document.getElementById("mypic-goes-here"); // pointer #2

    // When a change happens to the File Chooser Input
    fileInput.addEventListener('change', function (e) {
        ImageFile = e.target.files[0];   //Global variable
        var blob = URL.createObjectURL(ImageFile);
        //   image.src = blob; // Display this image
    })
}
listenFileSelect();
var imageBad;
function postEvent() {
    var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userName = user.displayName;
        var userID = user.uid;
        // var newEvent = db.collection("events").doc();
        var eventName = document.getElementById("eventName").value;
        var description = document.getElementById("description").value;
        var date = document.getElementById("eventYear").value + "-"
            + document.getElementById("eventMonth").value + "-"
            + document.getElementById("eventDay").value;
        imageBad = document.getElementById("eventImages").value;
        // imageGood = imageBad;
        // console.log(userName);

        var locationOfEvent = localStorage.getItem("place_name");
        console.log(eventName, description, date, locationOfEvent);

        db.collection("events").add({
            host: userID,
            hostName: userName,
            name: eventName,
            description: description,
            date: new Date(date),
            image: imageBad,
            location: locationOfEvent,
            count: 0
        }).then(doc => {
            console.log("1. Event document added!");
            console.log(doc.id);
            uploadPic(doc.id);
        })
    } else {
        console.log("No user is signed in");
    }

}

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
function uploadPic(eventDocID) {
    console.log("inside uploadPic " + eventDocID);
    var storageRef = storage.ref("images/" + eventDocID + ".jpg");
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
                    db.collection("events").doc(eventDocID).update({
                        "image": url // Save the URL into users collection
                    })
                        // AFTER .update is done
                        .then(function () {
                            console.log('4. Added pic URL to Firestore.');
                            // One last thing to do:
                            // save this postID into an array for the OWNER
                            // so we can show "my posts" in the future
                            saveEventIDforUser(eventDocID);
                        })
                })
        })
        .catch((error) => {
            console.log("error uploading to cloud storage");
        })
}

//From TechTip B01a COMP 1800
//--------------------------------------------
//saves the post ID for the user, in an array
//--------------------------------------------
function saveEventIDforUser(eventDocID) {
    firebase.auth().onAuthStateChanged(user => {
        console.log("user id is: " + user.uid);
        console.log("postdoc id is: " + eventDocID);
        db.collection("users").doc(user.uid).update({
            myEvents: firebase.firestore.FieldValue.arrayUnion(eventDocID)
        })
            .then(() => {
                console.log("5. Saved to user's document!");
                alert("Post is complete!");
                //window.location.href = "showposts.html";
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    })
}