var filteredDates = [];
var filteredLocations = [];
function filterDate() {
    const events = document.querySelectorAll('.eventCard');
    var activeDate = document.getElementById('activeDate');

    var dateS = document.getElementById('startDate').value;
    var dateE = document.getElementById('endDate').value;
    console.log("date:", dateE);
    var startDate = new Date(dateS);
    startDate.setHours(24, 0, 0, 0);
    var endDate;
    console.log(dateE, dateS, "startdate", startDate, "end", endDate);
    if (dateE == null || dateE == "") {
        activeDate.value = "After " + dateS;
    } else {
        endDate = new Date(dateE);
        endDate.setHours(48, 0, 0, 0);
        activeDate.value = dateS + " - " + dateE;
    }
    activeDate.style.display = "block";

    events.forEach(element => {
        var eventDate = new Date(element.querySelector('.card-date').innerHTML);
        console.log("eventdate", eventDate, " startDate  ", startDate, " endDate  ", endDate);
        if (endDate != null || endDate != "") {
            if (eventDate < startDate || eventDate > endDate) {
                element.style.display = "none";
                filteredDates.push(element.querySelector('i').id);
                console.log("hello");
            }
        } else {
            if (eventDate < startDate) {
                element.style.display = "none";
                filteredDates.push(element.querySelector('i').id);
            }
        }

    });
}

function filterLocation() {
    const events = document.querySelectorAll('.eventCard');
    var filterLocation = document.getElementById('rangeValue').value;
    var activeRange = document.getElementById('activeRange');
    navigator.geolocation.getCurrentPosition(position => {
        const userLocation = [position.coords.latitude, position.coords.longitude];
        console.log(userLocation[0], "---------", userLocation[1], filterLocation);


        if (filterLocation > 0 && filterLocation < 25) {
            activeRange.style.display = "inline-block";
            activeRange.value = "Within " + filterLocation + "km X";
            events.forEach(element => {
                var eventLocation = element.querySelector('.card-coordinates').innerHTML.split(',');
                console.log("Eloc: ", eventLocation, "fLoc", filterLocation);
                var d = getDistanceFromLatLonInKm(userLocation[0], userLocation[1], eventLocation[1], eventLocation[0]);
                if (d > filterLocation) {
                    filteredLocations.push(element.querySelector('i').id);
                    element.style.display = "none";
                }
            });
        }
        console.log(filteredLocations);
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


function applyFilters() {
    const events = document.querySelectorAll('.eventCard');
    var startDate = document.getElementById('startDate').value;

    var locationFilter = document.getElementById('rangeValue').value
    events.forEach(element => {
        element.style.display = "block";
    })
    if (startDate != null || startDate != "") {
        filterDate();
    }

    if (locationFilter > 0 || locationFilter < 25) {
        filterLocation();
    }
}

function clearLocation() {
    const events = document.querySelectorAll('.eventCard');
    events.forEach(element => {
        var match = element.querySelector('i').id;
        if (filteredLocations.includes(match) && !filteredDates.includes(match)) {
            element.style.display = "block";
        }
    });
    filteredLocations = [];
    document.getElementById('activeRange').style.display = "none";
}

function clearDate() {
    const events = document.querySelectorAll('.eventCard');
    events.forEach(element => {
        var match = element.querySelector('i').id;
        if (!filteredLocations.includes(match) && filteredDates.includes(match)) {
            element.style.display = "block";
        }
    });
    filteredDates = [];
    document.getElementById('activeDate').style.display = "none";
}

