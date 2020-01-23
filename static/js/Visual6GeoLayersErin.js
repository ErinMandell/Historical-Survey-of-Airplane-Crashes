// Create the tile layer that will be the background of our map
var streets = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

var baseMaps = {
  "StreetMap": streets,
  "LightMap": lightmap
};

// Initialize all of the LayerGroups we'll be using
var layers = {
  WWI: new L.LayerGroup(),
  WWII: new L.LayerGroup(),
  NonM: new L.LayerGroup(),
  OtherM: new L.LayerGroup()
};

// Create the map with our layers
var map = L.map("map-id", {
  center: [15.5994, -10.6731],
  zoom: 3,
  layers: [streets
    // layers.WWI,
    // layers.WWII,
    // layers.NonM,
    // layers.OtherM
  ]
});

// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);

// Create an overlays object to add to the layer control
var overlays = {
  "World War I": layers.WWI,
  "World War II": layers.WWII,
  "Other Military": layers.OtherM,
  "Non-Military": layers.NonM
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(baseMaps, overlays, {
  collapsed: false
}).addTo(map);



// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map
info.addTo(map);



// Initialize an object containing icons for each layer group
var icons = {
  WWI: L.ExtraMarkers.icon({
    icon: "ion-plane",
    iconColor: "white",
    markerColor: "red",
    shape: "penta"
  }),
  WWII: L.ExtraMarkers.icon({
    icon: "ion-plane",
    iconColor: "white",
    markerColor: "orange",
    shape: "penta"
  }),
  OtherM: L.ExtraMarkers.icon({
    icon: "ion-plane",
    iconColor: "white",
    markerColor: "yellow",
    shape: "penta"
  }),
  NonM: L.ExtraMarkers.icon({
    icon: "ion-plane",
    iconColor: "white",
    markerColor: "blue-dark",
    shape: "penta"
  })
};

// Perform an API call to the Citi Bike Station Information endpoint
d3.json("/geoData", function(response) 
{
  console.log(response);
  var crashes = response;
  console.log(crashes);

    // var stationStatus = statusRes.data.stations;
    // var stationInfo = infoRes.data.stations;

    // Create an object to keep of the number of markers in each layer
  var crashCount = 
  {
    WWI: 0,
    WWII: 0,
    OtherM: 0,
    NonM: 0
  };

    // Initialize a stationStatusCode, which will be used as a key to access the appropriate layers, icons, and station count for layer group
  var crashMilCode;

    // Loop through the stations (they're the same size and have partially matching data)
  for (var i = 0; i < crashes.length; i++) 
  {

      // Create a new station object with properties of both station objects
    var crash = Object.assign({}, crashes[i]);
 
    // WWI dates July 2, 1914 through Nov 11, 1918
    if (crash.Military == "Military" && crash.Year >= 1914 && crash.Year <=1918) {
      crashMilCode = "WWI";
    }

    // WWII dates Sept 1, 1939 through Sept 2, 1945
    else if (crash.Military == "Military" && crash.Year >= 1939 && crash.Year <= 1945) {
      crashMilCode = "WWII";
    }

    else if (crash.Military != "Military") {
      crashMilCode = "NonM";
    }

    else {
      crashMilCode = "OtherM";
    }

      // Update the station count
    crashCount[crashMilCode]++;

      // Create a new marker with the appropriate icon and coordinates
    var newMarker = L.marker([crash.lat, crash.long], 
      {
      icon: icons[crashMilCode]
      });

      // Add the new marker to the appropriate layer
      newMarker.addTo(layers[crashMilCode]);

      // Bind a popup to the marker that will  display on click. This will be rendered as HTML
      newMarker.bindPopup("<h3>" + crash.Location + "</h3> <hr> <h4>" + crash.Year + " - " + crash.Operator + "</h4> <hr> <p>" + crash.Summary + "</p>");
    }

    // Call the updateLegend function, which will... update the legend!
    updateLegend(crashCount);
  });


// Update the legend's innerHTML with the last updated time and station count
function updateLegend(crashCount) {
  document.querySelector(".legend").innerHTML = [
    "<p class='out-of-order'>World War I Crashes: " + crashCount.WWI + "</p>",
    "<p class='coming-soon'>World War II Crashes: " + crashCount.WWII + "</p>",
    "<p class='empty'>Other Military: " + crashCount.OtherM + "</p>",
    "<p class='low'>Non-Military Crashes: " + crashCount.NonM + "</p>"
  ].join("");
}
