
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

}