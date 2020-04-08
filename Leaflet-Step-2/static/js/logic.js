// Create our map, giving it the streetmap and earthquakes layers to display on load
var myMap = L.map("map", {
  center: [
    38, -97
  ],
  zoom: 5
});

// Define variables for our tile layers
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(myMap);

// Store API endpoint inside queryUrl
var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

var geojson;


// Perform a GET request to the query URL
d3.json(geoData, function(data) {

  geojson = L.choropleth(data, {
    valueProperty: "mag",
    scale: ["#ffffb2", "#b10026"],
    steps: 5,
    mode: "q",
    style: {
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },

    onEachFeature: function(feature, layer) {
      layer.bindPopup("<p>" + "<b>LOCATION:</b> " + features[i].properties.place + "<br>" 
      + "<b>MAGNITUDE:</b> " + features[i].properties.mag + "<br>"
      + "<b>LONGITUDE:</b> " + features[i].geometry.coordinates[0] + "<br>"
      + "<b>LATITUDE:</b> " + features[i].geometry.coordinates[1] + "<br>"
      + "<b>RECORDED TIME:</b> " + new Date(features[i].properties.time) + "<br>"
      + "<b>LAST UPDATED:</b> " + new Date(features[i].properties.updated) + "</p>");
    }
  }).addTo(myMap);
});


      

     


// // Store API endpoint inside queryUrl
// var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// function markerSize(magnitude) {
//   return magnitude * 150;
// }

// // Perform a GET request to the query URL
// d3.json(queryUrl, function(data) {
//     var features = data.features;

//     var earthquakeCoords = [];
    
//     for (var i = 0; i < features.length; i++) {
      
//       var intensity = "";
//       var mag = features[i].properties.mag;
      
//       if (mag > 3.5) {
//         intensity = "red";
//       }
//       else if (mag > 1.5) {
//         intensity = "yellow";
//       }
//       else {
//         intensity = "blue";
//       }
//       console.log("Earthquake", i);
//       console.log(features[i].properties.mag);
      

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

//     } // end of the for-loop
    

//     // Define variables for our tile layers
//     var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//       attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//       maxZoom: 18,
//       id: "mapbox.light",
//       accessToken: API_KEY
//     });

//     var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//       attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//       maxZoom: 18,
//       id: "mapbox.dark",
//       accessToken: API_KEY
//     });
 
//     var earthquakeLayer = L.layerGroup(earthquakeCoords);
  
//     // Only one base layer can be shown at a time
//     var baseMaps = {
//       BLAH: light,
//       Dark: dark
//     };

//     // Overlays that may be toggled on or off
//     var overlayMaps = {
//       "Earthquakes": earthquakeLayer
//     }; 
     
//     // Create our map, giving it the streetmap and earthquakes layers to display on load
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
//         "<p>Magnitude</p>";
//       return div;
//     };

//     // Adding legend to the map
//     legend.addTo(myMap);

// }); // end of d3.json