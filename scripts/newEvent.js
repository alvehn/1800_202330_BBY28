document.getElementById("timeValue").defaultValue = "12:00";
var ImageFile;
function listenFileSelect() {
    // listen for file selection
    var fileInput = document.getElementById("eventImages");

    // When a change happens to the File Chooser Input
    fileInput.addEventListener('change', function (e) {
        ImageFile = e.target.files[0];   //Global variable
    })
}
listenFileSelect();

var imageGood;
function postEvent() {

    document.getElementById("postButtonText").innerHTML = "Loading...";
    document.getElementById("postButtonText").disabled = true;
    var user = firebase.auth().currentUser;
    if (user) {
        check = true;
        var userID = user.uid;
        var eventName = document.getElementById("eventNaming").value;
        var description = document.getElementById("description").value;
        var dateB = document.getElementById("dateValue").value;

        //reads and formats date
        var dater = "" + dateB;
        var year = parseInt(dater.substring(0, 4));
        var month = parseInt(dater.substring(5, 7)) - 1; //fixes glitch where it shows selected date plus a month
        var day = parseInt(dater.substring(8, 10));
        var dateBad = new Date(year, month, day);
        dateBad = "" + dateBad;
        var date = dateBad.substring(0, 15); //grabs only date details and leaves out time and timezone details

        imageGood = document.getElementById("eventImages").value; //image of event

        //reads and formats time
        var timeBad = document.getElementById("timeValue").value //24 hour time
        var time = formatAMPM(timeBad); //24 hour time converted to 12 hour time

        var count = [];
        var locationOfEvent = localStorage.getItem("place_name");
        // console.log(locationOfEvent);
        var eventCoordinates = localStorage.getItem("place_coord");
        var tags = [];

        //formats location
        let locate = "" + locationOfEvent + ",";
        let s = "";
        let stringArray = [];
        for (const char of locate) {
            if (char === ',') {
                stringArray.push(s);
                s = "";
            } else {
                s += char;
            }
        }
        var location = "";
        for (let i = 0; i < stringArray.length; i++) {
            if (stringArray[i] === "") {
                stringArray.splice(i, 1);
            }
            else {
                location += stringArray[i] + ", ";
            }
        }
        console.log(location);

        var sports = document.getElementById("sports");
        var food = document.getElementById("food");
        var festival = document.getElementById("festival");
        var picnic = document.getElementById("picnic");

        if (sports.checked) {
            tags.push(" Sports");
        }
        if (food.checked) {
            tags.push(" Food");
        }
        if (festival.checked) {
            tags.push(" Festival");
        }
        if (picnic.checked) {
            tags.push(" Picnic");
        }

        if (validateForm(eventName, description, imageGood, location)) {
            db.collection("events").add({
                host: userID,
                name: eventName,
                description: description,
                date: date,
                image: imageGood,
                location: locationOfEvent,  //in case modified string value is needed
                locationRaw: locationOfEvent, //in case full event address needs to be displayed
                coordinates: eventCoordinates,
                count: count, //array of users interested in going to event
                tags: tags,
                time: time
            }).then(doc => {
                console.log("1. Event document added!");
                console.log(doc.id);
                uploadPic(doc.id);
            })
        }
    }

}
var offcanvasElement1 = document.getElementById("offcanvasBox1");
var offcanvas1 = new bootstrap.Offcanvas(offcanvasElement1);
var offcanvasElement2 = document.getElementById("offcanvasBox2");
var offcanvas2 = new bootstrap.Offcanvas(offcanvasElement2);
var offcanvasElement3 = document.getElementById("offcanvasBox3");
var offcanvas3 = new bootstrap.Offcanvas(offcanvasElement3);
var offcanvasElement4 = document.getElementById("offcanvasBox4");
var offcanvas4 = new bootstrap.Offcanvas(offcanvasElement4);
function validateForm(eventName, description, imageGood, location) {
    var check;
    if (eventName.trim() === "") {
        console.log(eventName);
        document.getElementById("postButtonText").innerHTML = "Save";
        document.getElementById("postButtonText").disabled = false;
        check = false;
        offcanvas1.toggle();
    } else if (description.trim() === "") {
        console.log(description);
        document.getElementById("postButtonText").innerHTML = "Save";
        document.getElementById("postButtonText").disabled = false;
        check = false;
        offcanvas2.toggle();
    } else if (imageGood.trim() === "") {
        console.log(imageGood);
        document.getElementById("postButtonText").innerHTML = "Save";
        document.getElementById("postButtonText").disabled = false;
        check = false;
        offcanvas3.toggle();
    } else if (location.trim() === "") {
        console.log(location);
        document.getElementById("postButtonText").innerHTML = "Save";
        document.getElementById("postButtonText").disabled = false;
        check = false;
        offcanvas4.toggle();
    }
    else {
        check = true;
    }

    return check;
}

//from https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
//formats the 24 time to 12 hour am/pm 
function formatAMPM(date) {
    var hours = parseInt(date.substring(0, 2)); //gets hour
    var minutes = parseInt(date.substring(3, 5)); //gets minute
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
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
                document.getElementById("postButtonText").innerHTML = "Event posted";
                sleep(1200).then(() => { window.location.href = "main.html";; });
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    })
}

// from https://www.sitepoint.com/delay-sleep-pause-wait/
//pauses the function for a given amount of milliseconds 
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}