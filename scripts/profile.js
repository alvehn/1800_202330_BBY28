

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

                            document.getElementById("name-goes-here").innerText = userName;
                            

                            //if the data fields are not empty, then write them in to the form.
                            if (userName != null) {
                                document.getElementById("name-goes-here").value = userName;
                            }
                        })
                } else {
                    // No user is signed in.
                    console.log ("No user is signed in");
                }
            });
        }

//call the function to run it 
populateUserInfo();