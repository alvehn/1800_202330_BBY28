
function filterDate() {
    const events = document.querySelectorAll('.eventCard');
    const startDate = new Date(document.getElementById('startDate').valueAsDate);
    events.forEach(element => {
        var eventDate = new Date(element.querySelector('.card-date').innerHTML);
        console.log("eventdate", eventDate, " startDate  ", startDate);

        if (eventDate < startDate) {
            element.style.display = "none";
        }
    });
}

function filterLocation() {
    const events = document.querySelectorAll('.eventCard');
    var filterLocation = document.getElementById('rangeValue').value;

    navigator.geolocation.getCurrentPosition(position => {
        const userLocation = [position.coords.latitude, position.coords.longitude];
        console.log(userLocation[0], "---------", userLocation[1], filterLocation);


        if (filterLocation > 0 && filterLocation < 25) {
            events.forEach(element => {
                var eventLocation = element.querySelector('.card-coordinates').innerHTML.split(',');
                console.log("Eloc: ", eventLocation, "fLoc", filterLocation);
                var d = getDistanceFromLatLonInKm(userLocation[0], userLocation[1], eventLocation[1], eventLocation[0]);
                console.log(d);
                if (d > filterLocation) {
                    console.log("hello");
                    element.style.display = "none";
                }
            });
        }
    });

}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}


// function filterLikes() {
//     const events = document.querySelectorAll('.eventCard');
//     var filterLikes = document.getElementById('favourites').value;
//     events.forEach(element => {
//         var eventIsFavourited = element.querySelector('i").innerHTML;
//         if(eventIsFourited != filterLikes) {
//             element.style.display = "none";
//         }
//     })
// }

function applyFilters() {
    const events = document.querySelectorAll('.eventCard');
    var dateFilter = document.getElementById('startDate').value;
    var locationFilter = document.getElementById('rangeValue').value
    events.forEach(element => {
        element.style.display = "block";
    })
    if (dateFilter != null || dateFilter != "") {
        filterDate();
    }

    if (locationFilter > 0 || locationFilter < 25) {
        filterLocation();
    }
}