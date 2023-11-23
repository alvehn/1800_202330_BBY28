
function filterDate() {
    const events = document.querySelectorAll('.eventCard');
    const startDate = new Date(document.getElementById('startDate').valueAsDate);
    events.forEach(element => {
        var eventDate = new Date(element.querySelector('.card-date').innerHTML);
        console.log("eventdate",eventDate," startDate  ", startDate);

        if(eventDate < startDate){
            element.style.display = "none";
        }
    });
}

function filterLocation(){
    const events = document.querySelectorAll('.eventCard');
    var filterLocation = document.getElementById('result').value;
    events.forEach(element => {     
        var eventLocation = element.querySelector('.card-location').innerHTML;
        console.log("Eloc: ", eventLocation, "fLoc", filterLocation);
        if(eventLocation != filterLocation){
            element.style.display = "none";
        }
    });
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

function applyFilters(){
    const events = document.querySelectorAll('.eventCard');
    var dateFilter = document.getElementById('startDate').value;
    var locationFilter = localStorage.getItem("place_coord");
    events.forEach(element => {
        element.style.display = "block";
    })
    if(dateFilter != null || dateFilter != ""){
        filterDate();
    }
    else if(locationFilter != null || locationFilter != ""){
        filterLocation();
    }
}