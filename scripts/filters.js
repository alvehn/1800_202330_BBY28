var filteredDates = [];
var filteredLocations = [];
var filteredTags = [];
const eventTags = ["Arts & Culture", "Health & Wellness", "Sports & Fitness", "Music", "Education",
    "All Ages", "19+", "Volunteer Opportunity", "Activism", "Nature & Outdoors",
    "Science & Technology"];



// Attach the "click" event to your button

eventTags.forEach(element => {

    const button = document.createElement('button');
    button.type = 'button';
    button.innerText = element;
    button.className = 'filterTag';
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

    document.getElementById('filterTags').appendChild(button);

});

function filterDate() {
    const events = document.querySelectorAll('.eventCard');
    var activeDate = document.getElementById('activeDate');

    var dateS = document.getElementById('startDate').value;
    var dateE = document.getElementById('endDate').value;

    var startDate = new Date(dateS);
    startDate.setHours(24, 0, 0, 0);
    var endDate;

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
        if (endDate != null || endDate != "") {
            if (eventDate < startDate || eventDate > endDate) {
                element.style.display = "none";
                filteredDates.push(element.querySelector('i').id);
            }
        } else {
            if (eventDate < startDate) {
                element.style.display = "none";
                filteredDates.push(element.querySelector('i').id);
            }
        }

    });
}

var start = document.querySelectorAll('[name="date-field"]');
start.forEach(element => {
    element.addEventListener("change", function (event) {
        console.log("outside", this.id);
        if (this.id == "startDate") {
            console.log("inside", this.id);
            document.getElementById("startDate").blur();
            document.getElementById("endDate").disabled = false;
            minDate("endDate");
        } else {
            console.log("inside", this.id);
            document.getElementById("endDate").blur();
        }
    });
});


function minDate(datefieldID) {
    var minimumDate;
    if (datefieldID == "startDate") {
        minimumDate = new Date().toLocaleDateString('en-ca');
    } else if (datefieldID == "endDate") {
        minimumDate = document.getElementById("startDate").value;
    }
    console.log(minimumDate);
    document.getElementById(datefieldID).setAttribute("min", minimumDate);
}
minDate("startDate");

function filterTags() {

    const events = document.querySelectorAll('.eventCard');
    var activeTags = [];
    document.querySelectorAll('.filterTag').forEach(element => {
        if (element.value == 1) {
            activeTags.push(element.innerText);
            element.value = 1;
        }

    });

    var tagstr ="";
    events.forEach(element => {
        tagstr = element.querySelector('.card-tags').innerHTML;
        for (i = 0; i < activeTags.length; i++) {
            console.log(tagstr);
            if(tagstr.includes(activeTags[i])){
                element.style.display = "none";
                filteredTags.push(element.querySelector('i').id);
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

        if (filterLocation > 0 && filterLocation < 25) {
            activeRange.style.display = "inline-block";
            activeRange.value = "Within " + filterLocation + "km X";
            events.forEach(element => {
                var eventLocation = element.querySelector('.card-coordinates').innerHTML.split(',');
                var d = getDistanceFromLatLonInKm(userLocation[0], userLocation[1], eventLocation[1], eventLocation[0]);
                if (d > filterLocation) {
                    filteredLocations.push(element.querySelector('i').id);
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


function applyFilters() {
    const events = document.querySelectorAll('.eventCard');
    var startDate = document.getElementById('startDate').value;

    var locationFilter = document.getElementById('rangeValue').value
    events.forEach(element => {
        element.style.display = "block";
    })

    console.log("outside", startDate.value);

    if (startDate != null && startDate != "") {
        console.log("inside", startDate);
        filterDate();
    }

    if (locationFilter > 0 || locationFilter < 25) {
        filterLocation();
    }

    filterTags();
}

function clearTags(){
    
    const events = document.querySelectorAll('.eventCard');
    events.forEach(element => {
        var match = element.querySelector('i').id;
        if (!filteredDates.includes(match) && !filteredLocations.includes(match) && filteredTags.includes(match)) {
            element.style.display = "block";
        }
    });
    filteredTags = [];
    document.getElementById('activeDate').style.display = "none";
}

function clearLocation() {
    const events = document.querySelectorAll('.eventCard');
    events.forEach(element => {
        var match = element.querySelector('i').id;
        if (filteredLocations.includes(match) && !filteredDates.includes(match) && !filteredTags.includes(match)) {
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
        if (filteredDates.includes(match) && !filteredLocations.includes(match) && !filteredTags.includes(match)) {
            element.style.display = "block";
        }
    });
    filteredDates = [];
    document.getElementById('activeDate').style.display = "none";
}

