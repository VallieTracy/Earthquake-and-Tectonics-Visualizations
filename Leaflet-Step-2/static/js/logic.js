// var platesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";
var platesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

d3.json(platesUrl, function(plate) {

  var feature = plate.features;
  console.log("features:", feature);

  var lineCoords = [];

  for (var i = 0; i < feature.length; i++) {
      var coords = feature[i].geometry.coordinates;
      console.log("coords[0]:", coords[0]);
      
      lineCoords.push(
      L.polyline([feature[i].geometry.coordinates], {
        color: "red"
      })
    );
  }
  console.log("lineCoords:", lineCoords);
  console.log("firstLat:", feature[0].geometry.coordinates[0][1]);
  console.log("firstLon:", feature[0].geometry.coordinates[0][0]);
  console.log("2ndLat:", feature[0].geometry.coordinates[1][1]);
  console.log("2ndLon:", feature[0].geometry.coordinates[1][0]);
  console.log("lastLat:", feature[0].geometry.coordinates[16][1]);
  
  

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

  var platesLayer = L.layerGroup(lineCoords);

  // Only one base layer can be shown at a time
  var baseMaps = {
    Satellite: satellite,
    Dark: dark,
    Light: light
  };

  // Overlays that may be toggled on or off
  var overlayMaps = {
    "Tectonic Plates": platesLayer
  };

  // Create our map, default will be dark and earthquakeLayer
  var myMap = L.map("map", {
    center: [
      38, -97
    ],
    zoom: 5,
    layers: [light, platesLayer]
  });

  L.control.layers(baseMaps, overlayMaps).addTo(myMap);


}); // end of d3.json for platesUrl

// //Store API endpoint inside queryUrl
// var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// // Function to determine marker size
// function markerSize(magnitude) {
//   return magnitude * 250;
// }

// // Perform a GET request to the query URL
// d3.json(queryUrl, function(data) {
    
//     // Create variable to hold the array of objects
//     var features = data.features;

//     // Create empty list to hold earthquake coordinates
//     var earthquakeCoords = [];
    
//     // Create for-loop to create circle markers and popups
//     for (var i = 0; i < features.length; i++) {
      
//       // variable that will specificy circle color
//       var intensity = "";
      
//       if (features[i].properties.mag > 4.5) {
//         intensity = "#800000";
//       }
//       else if (features[i].properties.mag > 3) {
//         intensity = "#e60000";
//       }
//       else if (features[i].properties.mag > 1.5) {
//         intensity = "#ff6600";
//       }
//       else {
//         intensity = "#6699ff";
//       }

//       // Push earthquake coords and make circles + popups
//       earthquakeCoords.push(
//         L.circle([features[i].geometry.coordinates[1],
//           features[i].geometry.coordinates[0]], {
//             fillOpacity: 0.75,
//             color: "black",
//             fillColor: intensity,
//             weight: 1,
//             radius: markerSize(features[i].properties.mag * 200)
//           }).bindPopup("<p>" + "<b>LOCATION:</b> " + features[i].properties.place + "<br>" 
//                     + "<b>MAGNITUDE:</b> " + features[i].properties.mag + "<br>"
//                     + "<b>LONGITUDE:</b> " + features[i].geometry.coordinates[0] + "<br>"
//                     + "<b>LATITUDE:</b> " + features[i].geometry.coordinates[1] + "<br>"
//                     + "<b>RECORDED TIME:</b> " + new Date(features[i].properties.time) + "<br>"
//                     + "<b>LAST UPDATED:</b> " + new Date(features[i].properties.updated) + "</p>")
//       );
//     } 
      
//     // Define variables for our tile layers
//     var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//       attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//       maxZoom: 18,
//       id: "mapbox.satellite",
//       accessToken: API_KEY
//     });

//     var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//       attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//       maxZoom: 18,
//       id: "mapbox.dark",
//       accessToken: API_KEY
//     });

//     var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//       attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//       maxZoom: 18,
//       id: "mapbox.light",
//       accessToken: API_KEY
//     });
 
//     var earthquakeLayer = L.layerGroup(earthquakeCoords);
  
//     // Only one base layer can be shown at a time
//     var baseMaps = {
//       Satellite: satellite,
//       Dark: dark,
//       Light: light
//     };

//     // Overlays that may be toggled on or off
//     var overlayMaps = {
//       "Earthquakes": earthquakeLayer
//     }; 
     
//     // Create our map, default will be dark and earthquakeLayer
//     var myMap = L.map("map", {
//       center: [
//         38, -97
//       ],
//       zoom: 5,
//       layers: [light, earthquakeLayer]
//     });
   
//     L.control.layers(baseMaps, overlayMaps).addTo(myMap);
    
//     // Set up the legend
//     var legend = L.control({ position: "bottomright" });
    
//     legend.onAdd = function() {
//       var div = L.DomUtil.create("div", "legend");
//       div.innerHTML =
//       "<p class='legend fourfive'> Magnitude > 4.5 </p>" +
//       "<p class='legend three'> Magnitude > 3 </p>" +
//       "<p class='legend onefive'> Magnitude > 1.5 </p>" + 
//       "<p class='legend under'> Magnitude < 1.5 </p>";
//       return div;
//     };

//     // Adding legend to the map
//     legend.addTo(myMap);
// });


