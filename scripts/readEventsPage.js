var currentUserID;
$("#deleteEvent").hide();
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
                .then(userStuff => {
                    eventCreator = userStuff.data().name;
                }).then(() => {

                    var title = doc.data().name;                // get value of the "name" 
                    var description = doc.data().description; //get value of the "description"
                    var date = doc.data().date.toDate();             //get value of "date"
                    var location = doc.data().location;     //gets value of "location"
                    var imageBad = doc.data().image;
                    console.log(imageBad);

                    var docID = doc.id;

                    // populates name, location, title, and description
                    document.getElementById("eventName").innerHTML = title;
                    document.getElementById("eventLocation").innerHTML = location;
                    document.getElementById("eventDescription").innerHTML = description;
                    document.getElementById("eventDateTime").innerHTML = date;
                    document.getElementById("eventHost").innerHTML = eventCreator;

                    document.getElementById("eventImages").src = imageBad;

                    console.log(currentUserID);
                    console.log(doc.data().host);
                    if (currentUserID === doc.data().host) {
                        document.getElementById("deleteEvent").onclick = () => deletePost(doc.id);
                        $("#deleteEvent").show();
                    } else {
                        
                    }

                })
        });


}
function getCurrentUser() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            currentUserID = user.uid;
            // console.log(currentUserID);
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}
getCurrentUser();

displayFullEvent();

function deletePost(postid) {
    var result = confirm("Want to delete?");
    if (result) {
        //Logic to delete the item
        db.collection("posts").doc(postid)
            .delete()
            .then(() => {
                console.log("1. Document deleted from Posts collection");
                deleteFromMyPosts(postid);
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
    }
}


function deleteFromMyPosts(postid) {
    firebase.auth().onAuthStateChanged(user => {
        db.collection("users").doc(user.uid).update({
            myposts: firebase.firestore.FieldValue.arrayRemove(postid)
        })
            .then(() => {
                console.log("2. post deleted from user doc");
                deleteFromStorage(postid);
            })
    })
}


function deleteFromStorage(postid) {
    // Create a reference to the file to delete
    var imageRef = storageRef.child('images/' + postid + '.jpg');

    // Delete the file
    imageRef.delete().then(() => {
        // File deleted successfully
        console.log("3. image deleted from storage");
        alert("DELETE is completed!");
        location.reload();
    }).catch((error) => {
        // Uh-oh, an error occurred!
    });
}