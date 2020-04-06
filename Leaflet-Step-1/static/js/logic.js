// Store API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";

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
      
      // var color = "";
      // if (features[i].properties.mag > 5.1) {
      //   color = "yellow";
      // }
      // else if (features[i].properties.mag > 4.8) {
      //   color = "blue";
      // }
      // else if (features[i].properties.mag > 4.6) {
      //   color = "red";
      // }
      // else {
      //   color = "green";
      // }
      

      earthquakeCoords.push(
        L.circle([features[i].geometry.coordinates[1],
          features[i].geometry.coordinates[0]], {
            color: "red",
            
            radius: 1000
          }).bindPopup("<p>" + "<b>LOCATION:</b> " + features[i].properties.place + "<br>" 
                    + "<b>MAGNITUDE:</b> " + features[i].properties.mag + "<br>"
                    + "<b>LONGITUDE:</b> " + features[i].geometry.coordinates[0] + "<br>"
                    + "<b>LATITUDE:</b> " + features[i].geometry.coordinates[1] + "<br>"
                    + "<b>RECORDED TIME:</b> " + new Date(features[i].properties.time) + "<br>"
                    + "<b>LAST UPDATED:</b> " + new Date(features[i].properties.updated) + "</p>")
      );

    } // end of the for-loop

    var earthquakeLayer = L.layerGroup(earthquakeCoords);

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
      id: "mapbox.dark",
      accessToken: API_KEY
    });

    // Only one base layer can be shown at a time
    var baseMaps = {
      BLAH: light,
      Dark: dark
    };

    // Overlays that may be toggled on or off
    var overlayMaps = {
      Earthquakes: earthquakeLayer
    }; 
    
    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
      center: [
        30, 21
      ],
      zoom: 3,
      layers: [light, earthquakeLayer]
    });

    L.control.layers(baseMaps, overlayMaps).addTo(myMap);

}); // end of d3.json




















// function createFeatures(earthquakeData) {

//     // Define a function we want to run once for each feature in the features array
//     // Create a popup describing each 'feature' (earthquake)
//     function onEachFeature(feature, layer) {
//         layer.bindPopup("<p>" + "<b>LOCATION:</b> " + feature.properties.place + "<br>" 
//         + "<b>MAGNITUDE:</b> " + feature.properties.mag + "<br>"
//         + "<b>LONGITUDE:</b> " + feature.geometry.coordinates[0] + "<br>"
//         + "<b>LATITUDE:</b> " + feature.geometry.coordinates[1] + "<br>"
//         + "<b>RECORDED TIME:</b> " + new Date(feature.properties.time) + "<br>"
//         + "<b>LAST UPDATED:</b> " + new Date(feature.properties.updated) + "</p>");
//     }

//     var earthquakes = L.geoJSON(earthquakeData, {
//         onEachFeature: onEachFeature
//     });
    
//     // this function created below.  What does it do?
//     createMap(earthquakes);
// }

// function createMap(earthquakes) {

//     // Define streetmap and darkmap layers
//     var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//       attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//       maxZoom: 18,
//       id: "mapbox.streets",
//       accessToken: API_KEY
//     });
  
//     var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//       attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//       maxZoom: 18,
//       id: "mapbox.dark",
//       accessToken: API_KEY
//     });
  
//     // Define a baseMaps object to hold our base layers
//     var baseMaps = {
//       "Street Map": streetmap,
//       "Dark Map": darkmap
//     };
  
//     // Create overlay object to hold our overlay layer
//     var overlayMaps = {
//       Earthquakes: earthquakes
//     };
  
//     // Create our map, giving it the streetmap and earthquakes layers to display on load
//     var myMap = L.map("map", {
//       center: [
//         30, 21
//       ],
//       zoom: 3,
//       layers: [streetmap, earthquakes]
//     });
  
//     // Create a layer control
//     // Pass in our baseMaps and overlayMaps
//     // Add the layer control to the map
//     L.control.layers(baseMaps, overlayMaps, {
//       collapsed: true
//     }).addTo(myMap);
//   }