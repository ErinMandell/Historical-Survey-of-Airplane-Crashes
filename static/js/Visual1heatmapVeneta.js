  var myMap = L.map("map").setView([15.5994, -28.6731], 2, [streets, light]);

  var streets = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);
  
  
  var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  }).addTo(myMap);
  
  
  var baseMaps = {
    StreetMap: streets,
    LightMap: light
  };
  
  L.control.layers(baseMaps).addTo(myMap);
  console.log("Loaded heatmap.js");

  d3.json("/geoData").then(response => {
  
    var crashesData = [];
    crashesData = response;

    console.log(response);

    var heatArray =[];
  
    for (var i=0; i < crashesData.length; i++) {
      var crash = crashesData[i];

        heatArray.push([crash.lat, crash.long]);
    }

    console.log(heatArray);

    var heat = L.heatLayer(heatArray,
        {
            radius: 40,
            blur: 10
        }).addTo(myMap);
});
    