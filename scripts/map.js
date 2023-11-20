
function placeGeocoder() {
    // TO MAKE THE MAP APPEAR YOU MUST
    // ADD YOUR ACCESS TOKEN FROM
    // https://account.mapbox.com
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2dyZXdhbDExOCIsImEiOiJjbHA3NHB5aHMwMjJzMmt1amVibjdocnAyIn0.dcxSGmJgXjT_jmI9gUX7cA';
    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        types: 'country,region,place,postcode,locality,neighborhood,address'
    });

    geocoder.addTo('#geocoder');

    // Get the geocoder results container.
    const results = document.getElementById('result');

    // Add geocoder result to container.
    geocoder.on('result', (e) => {
        var jsondata = JSON.stringify(e.result, null, 2);
        var data = JSON.parse(jsondata);
        console.log (data);
        var place_name = data["place_name"];
        var place_coord = data["geometry"]["coordinates"];
        results.innerText = place_name + " " + place_coord;  //show it on dom, debug
        
        //You can save this into local storage for now.  
        //When it is time to Submit the Post you can get the data from Local Storage
        localStorage.setItem("place_name", place_name);
        localStorage.setItem("place_coord", place_coord);
    });

    // Clear results container when search is cleared.
    geocoder.on('clear', () => {
        results.innerText = '';
    });
}
placeGeocoder();