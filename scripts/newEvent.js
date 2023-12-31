var ImageFile;
const eventTags = ["Arts & Culture", "Health & Wellness", "Sports & Fitness", "Music", "Education",
    "All Ages", "19+", "Volunteer Opportunity", "Activism", "Nature & Outdoors",
    "Science & Technology"];
    
function listenFileSelect() {
    // listen for file selection
    var fileInput = document.getElementById("eventImages");

    // When a change happens to the File Chooser Input
    fileInput.addEventListener('change', function (e) {
        ImageFile = e.target.files[0];   //Global variable
    })
}
listenFileSelect();



eventTags.forEach(loadTags);

function loadTags(element) {
    // Create a button element

    const button = document.createElement('button');
    button.type = 'button';
    button.innerText = element;
    button.className = 'tagButton';
    button.value = 0;

    button.addEventListener('click', function () {
        if (this.value == 0) {
            this.style.opacity = '100%';
            this.value = 1;
        } else {
            this.style.opacity = '50%';
            this.value = 0;
        }
    });

    document.getElementById('eventTags').appendChild(button);
}

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
        var eventCoordinates = localStorage.getItem("place_coord");


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

        var tags = [];
        var selectedTags = document.querySelectorAll('.tagButton');
        selectedTags.forEach(element => {

            if (element.value == 1) {
                tags.push(" " + element.innerText);
            }
        });


        if (validateForm(eventName, description, imageGood, location, time)) {
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
                localStorage.setItem("place_name", "");
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
var offcanvasElement5 = document.getElementById("offcanvasBox5");
var offcanvas5 = new bootstrap.Offcanvas(offcanvasElement5);

function validateForm(eventName, description, imageGood, location, time) {
    var check;
    if (eventName.trim() === "") {
        check = false;
        offcanvas1.toggle();
    } else if (time.trim() === "12:NaN am") {
        check = false;
        offcanvas5.toggle();
    }
    else if (description.trim() === "") {
        check = false;
        offcanvas2.toggle();
    } else if (imageGood.trim() === "") {
        check = false;
        offcanvas3.toggle();
    } else if (location.trim() === "") {
        check = false;
        offcanvas4.toggle();
    }
    else {
        check = true;
    }

    if (!check) {
        document.getElementById("postButtonText").innerHTML = "Save";
        document.getElementById("postButtonText").disabled = false;
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
    var storageRef = storage.ref("images/" + eventDocID + ".jpg");

    storageRef.put(ImageFile)   //global variable ImageFile

        // AFTER .put() is done
        .then(function () {
            storageRef.getDownloadURL()

                // AFTER .getDownloadURL is done
                .then(function (url) { // Get URL of the uploaded file

                    // Now that the image is on Storage, we can go back to the
                    // post document, and update it with an "image" field
                    // that contains the url of where the picture is stored.
                    db.collection("events").doc(eventDocID).update({
                        "image": url // Save the URL into users collection
                    })
                        // AFTER .update is done
                        .then(function () {
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
        db.collection("users").doc(user.uid).update({
            myEvents: firebase.firestore.FieldValue.arrayUnion(eventDocID)
        })
            .then(() => {
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