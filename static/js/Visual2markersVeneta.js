// Create a map object
  var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3,
  });

  //   Adding tile layers
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);
  
  d3.json("/geoData").then(response => {
    console.log("start");

    var crashesData = [];
    crashesData = response;
    console.log(response);

    var markers = L.markerClusterGroup();

    for (var i=0; i < crashesData.length; i++) {

      var crash = crashesData[i];
  
        markers.addLayer(L.marker([crash.lat, crash.long])
        .bindPopup("<h4>" + crash.Location + "</h4> <hr> <h4>" + crash.Year + " - " + crash.Operator + "</h4>")  
        )}
      
    myMap.addLayer(markers);
  
  });
 