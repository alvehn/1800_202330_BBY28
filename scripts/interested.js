//need to fix for loop logic. maybe switch case?
function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            interestedEvent(user.uid);
        } else {
            console.log("No user is signed in");
        }
    });
}
doAll();

function interestedEvent(userID) {
    let params = new URL(window.location.href); //get URL of search bar
    // console.log(params);
    let ID = params.searchParams.get("docID"); //get value for key "id"
    // console.log(ID);

    //stores count for number of people interested 
    var count;
    var interestedEvents = [];
    var check = true;
    document.getElementById("eventInterested").addEventListener("click", () => {
        //gets interested array
        db.collection("users")
            .doc(userID)
            .get()
            .then(doc => {
                interestedEvents = doc.data().interested;
                console.log(interestedEvents.length);
            })
        var i = 0;
        //checks if user has already clicked button 
        console.log(interestedEvents.length + " " + i);
        for (i = 0; i <= interestedEvents.length; i++) {
            if (interestedEvents[i] === ID) {
                check = false;
                // let interestedEvents = interestedEvents.filter((element, index) => index !== ID);
                break;
            } if (interestedEvents[i] == ID && i == interestedEvents.length) {
                check = true;
                break;
            }
        }

        if (check) {
            //gets current count
            db.collection("events")
                .doc(ID)
                .get()
                .then(doc => {
                    count = doc.data().count;
                }).then( () => {

            count = count + 1;
            db.collection("events")
                .doc(ID)
                .update({
                    count: count
                });
            }).then( () => {

            db.collection("events")
                .doc(ID)
                .get()
                .then(doc => {
                    count = doc.data().count;
                });
            interestedEvents.push(ID);

            }).then ( () => {
            db.collection("users")
            .doc(userID)
            .update({
                interested: interestedEvents
            })
        }).then( () => {

            // console.log(params);
            document.getElementById("eventCount").innerHTML = count;
            document.getElementById("eventInterestedText").innerHTML = "I'm not interested";
        })

        } else if (!check) {
            //go into interested array, find this event using params, and delete that index, and do the reverse of what is above
            db.collection("events")
                .doc(ID)
                .get()
                .then(doc => {
                    count = doc.data().count;
                }).then ( () => {
                
                    count--;
                db.collection("events")
                    .doc(ID)
                    .update({
                        count: count
                    });
                }).then( () => {
                
                db.collection("events")
                    .doc(ID)
                    .get()
                    .then(doc => {
                        count = doc.data().count;
                    });
                }).then( () => {
                interestedEvents = interestedEvents.splice(i, i);
                db.collection("users")
                .doc(userID)
                .update({
                    interested: interestedEvents
                })
            }).then( () => {

                // console.log(params);
                document.getElementById("eventCount").innerHTML = count;
                document.getElementById("eventInterestedText").innerHTML = "yabba dee yabba doo";
            });
        }
    })

}
