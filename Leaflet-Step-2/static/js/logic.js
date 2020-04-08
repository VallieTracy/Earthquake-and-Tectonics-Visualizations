// Store API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

function markerSize(magnitude) {
  return magnitude * 150;
}

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
    var features = data.features;
    ////////
    console.log("features:", features);
    console.log("Total Earthquakes:", features.length);
    console.log(features[5].properties.mag);
    console.log("LONGITUDE[0]:",features[0].geometry.coordinates[0]);
    /////////
    var earthquakeCoords = [];
    
    for (var i = 0; i < features.length; i++) {
      
      var intensity = "";
      
      if (features[i].properties.mag > 5.5) {
        intensity = "#4d0000";
      }
      else if (features[i].properties.mag > 5) {
        intensity = "990000";
      }
      else if (features[i].properties.mag > 4.5) {
        intensity = "#ff0000";
      }
      else if (features[i].properties.mag > 4) {
        intensity = "#ff751a";
      }
      else if (features[i].properties.mag > 3.5) {
        intensity = "#ffa366";
      }
      else if (features[i].properties.mag > 3) {
        intensity = "#ff6666";
      }
      else if (features[i].properties.mag > 2.5) {
        intensity = "#ff9999";
      }
      else if (features[i].properties.mag > 2) {
        intensity = "#ff9933";
      }
      else if (features[i].properties.mag > 1.5) {
        intensity = "#ffbf80";
      }
      else if (features[i].properties.mag > 1) {
        intensity = "#ffff99";
      }
      else {
        intensity = "#ffffcc";
      }
      console.log("Earthquake", i);
      console.log(features[i].properties.mag);
      

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

    } // end of the for-loop
    
    // Define variables for our tile layers
    var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.light",
      accessToken: API_KEY
    });

    var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.wheatpaste",
      accessToken: API_KEY
    });

    var earthquakeLayer = L.layerGroup(earthquakeCoords);
  
    // Only one base layer can be shown at a time
    var baseMaps = {
      BLAH: light,
      Dark: dark
    };

    // Overlays that may be toggled on or off
    var overlayMaps = {
      "Earthquakes": earthquakeLayer
    }; 
     
    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
      center: [
        38, -97
      ],
      zoom: 5,
      layers: [light, earthquakeLayer]
    });
   
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);
    
    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "legend");
      div.innerHTML =
      "<p class='legend green'> Magnitude < 1.0 </p>" +
      "<p class='legend yellow'> Magnitude < 2.5 </p>" +
      "<p class='legend orange'> Magnitude < 4.5 </p>" + 
      "<p class='legend red'> Magnitude = 4.5+ </p>";
      return div;
    };

    // Adding legend to the map
    legend.addTo(myMap);

}); // end of d3.json