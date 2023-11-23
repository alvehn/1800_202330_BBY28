//try adding array inside events that stores users id's and uses length of that for count
//this works for only one user, if multiple users are interesteed, and one of the unlicks it
//it clears all of their names except for the user that unclicked. look into how splice works
//and study your for loop


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
    var count = [];
    var counter = 0;
    db.collection("events")
            .doc(ID)
            .get()
            .then(doc => {
                count = doc.data().count;
                counter = count.length;
                console.log(counter);
                document.getElementById("eventCount").innerHTML = counter;
                console.log(document.getElementById("eventCount").innerHTML);
            });
    var interestedEvents = [];
    var check;
    // var check = true;
    document.getElementById("eventInterested").addEventListener("click", () => {
        //gets interested array
        console.log(userID);
        db.collection("events")
            .doc(ID)
            .get()
            .then(doc => {
                count = doc.data().count;
                counter = count.length;
                document.getElementById("eventCount").innerHTML = counter;
            }).then ( () => {
        var i = 0;
        //checks if user has already clicked button 
        //console.log("Array: " + interestedEvents +  " Current: " + ID);
        for (i = 0; i <= count.length; i++) {
            if (count[i] === userID) {
                check = false;
                break;
            } else if (count[i] !== userID && i === count.length) {
                check = true;
                break;
            }
        }

        if (check) {
            //gets current count
            count.push(userID);
            db.collection("events")
            .doc(ID)
            .update({
                count: count
            })
        //     db.collection("events")
        //         .doc(ID)
        //         .get()
        //         .then(doc => {
        //             count = doc.data().count;
        //         }).then( () => {

        //     count = count + 1;
        //     db.collection("events")
        //         .doc(ID)
        //         .update({
        //             count: count
        //         });
        //     }).then( () => {

        //     interestedEvents.push(ID);
        //     }).then ( () => {
        //     db.collection("users")
        //     .doc(userID)
        //     .update({
        //         interested: interestedEvents
        //     })
        // }).then( () => {

        //     // console.log(params);
        //    
        // })
            counter = count.length;
            document.getElementById("eventCount").innerHTML = counter;
            document.getElementById("eventInterestedText").innerHTML = "I'm interested";
        } if (!check) {
            count = count.splice(i, i);
            db.collection("events")
            .doc(ID)
            .update({
                count: count
            })
            //go into interested array, find this event using params, and delete that index, and do the reverse of what is above
            // db.collection("events")
            //     .doc(interestedEvents[i])
            //     .get()
            //     .then(doc => {
            //         count = doc.data().count;
            //     }).then ( () => {
                
            //         count--;
            //     db.collection("events")
            //         .doc(interestedEvents[i])
            //         .update({
            //             count: count
            //         });
            //     }).then( () => {
                
            //     interestedEvents = interestedEvents.splice(i, i);
            //     db.collection("users")
            //     .doc(userID)
            //     .update({
            //         interested: interestedEvents
            //     })
            // }).then( () => {

            //     // console.log(params);
            //     
            // });
            counter = count.length;
            document.getElementById("eventCount").innerHTML = counter;
            document.getElementById("eventInterestedText").innerHTML = "I'm not interested";
        }
    })
    })

}
