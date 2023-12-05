
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
    let ID = params.searchParams.get("docID"); //get value for key "id"

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
            for (let j = 0; j <= count.length; j++) {
                if (count[j] === userID) {
                    document.getElementById("eventInterestedText").innerHTML = "Attending";
                    break;
                } else if (count[j] !== userID && j === count.length) {
                    document.getElementById("eventInterestedText").innerHTML = "Attend";
                    break;
                }
            }
            console.log(document.getElementById("eventCount").innerHTML);
        });
    var check;
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
            }).then(() => {
                var i = 0;
                //checks if user has already clicked button 
                for (i = 0; i <= count.length; i++) {
                    if (count[i] === userID) {
                        check = false;
                        break;
                    } else if (count[i] !== userID && i === count.length) {
                        check = true;
                        break;
                    }
                }

                //this if statement adds user doc id to count array
                if (check) {
                    //pushes user doc id into count array and updates array
                    count.push(userID);
                    db.collection("events")
                        .doc(ID)
                        .update({
                            count: count
                        })

                    counter = count.length;
                    document.getElementById("eventCount").innerHTML = counter;
                    document.getElementById("eventInterestedText").innerHTML = "Attending";

                    //this if statement removes user doc id from count array    
                } if (!check) {
                    //remove user doc id from count array and update array
                    count.splice(i, 1);
                    db.collection("events")
                        .doc(ID)
                        .update({
                            count: count
                        })

                    counter = count.length;
                    document.getElementById("eventCount").innerHTML = counter;
                    document.getElementById("eventInterestedText").innerHTML = "Attend";
                }
            })
    })

}
