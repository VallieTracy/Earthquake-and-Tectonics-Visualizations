// Store API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";

// Function to determine marker size
function markerSize(magnitude) {
  return magnitude * 250;
}

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
    
    // Create variable to hold the array of objects
    var features = data.features;
    console.log("features/states:", features);

    // Create empty list to hold earthquake coordinates
    var earthquakeCoords = [];
    
    // Create for-loop to create circle markers and popups
    for (var i = 0; i < features.length; i++) {
      
      // variable that will specificy circle color
      var intensity = "";
      
      if (features[i].properties.mag > 4.5) {
        intensity = "#b30000";
      }
      else if (features[i].properties.mag > 3) {
        intensity = "#ff4000";
      }
      else if (features[i].properties.mag > 1.5) {
        intensity = "#ff8000";
      }
      else {
        intensity = "#6699ff";
      }

      // Push earthquake coords and make circles + popups
      earthquakeCoords.push(
        L.circle([features[i].geometry.coordinates[1],
          features[i].geometry.coordinates[0]], {
            fillOpacity: 0.75,
            color: "black",
            fillColor: intensity,
            weight: 1,
            radius: markerSize(features[i].properties.mag * 200)
          }).bindPopup("<p>" + "<b>LOCATION:</b> " + features[i].properties.place + "<br>" 
                    + "<b>MAGNITUDE:</b> " + features[i].properties.mag + "<br>"
                    + "<b>LONGITUDE:</b> " + features[i].geometry.coordinates[0] + "<br>"
                    + "<b>LATITUDE:</b> " + features[i].geometry.coordinates[1] + "<br>"
                    + "<b>RECORDED TIME:</b> " + new Date(features[i].properties.time) + "<br>"
                    + "<b>LAST UPDATED:</b> " + new Date(features[i].properties.updated) + "</p>")
      );
    } 
    
    // Define variables for our tile layers
    var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.satellite",
      accessToken: API_KEY
    });

    var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.dark",
      accessToken: API_KEY
    });

    var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.light",
      accessToken: API_KEY
    });
 
    var earthquakeLayer = L.layerGroup(earthquakeCoords);
  
    // Only one base layer can be shown at a time
    var baseMaps = {
      Satellite: satellite,
      Dark: dark,
      Light: light
    };

    // Overlays that may be toggled on or off
    var overlayMaps = {
      "Earthquakes": earthquakeLayer
    }; 
     
    // Create our map, default will be dark and earthquakeLayer
    var myMap = L.map("map", {
      center: [
        38, -97
      ],
      zoom: 5,
      layers: [dark, earthquakeLayer]
    });
   
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);
    
    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "legend");
      div.innerHTML =
      "<p class='legend fourfive'> Magnitude > 4.5 </p>" +
      "<p class='legend three'> Magnitude > 3 </p>" +
      "<p class='legend onefive'> Magnitude > 1.5 </p>" + 
      "<p class='legend under'> Magnitude < 1.5 </p>";
      return div;
    };

    // Adding legend to the map
    legend.addTo(myMap);

}); 



















