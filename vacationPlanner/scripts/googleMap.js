'use strict';
//import MarkerClusterer from "./libraries/marker/packages/markerclusterer/src/markerclusterer.js";
//https://www.protechtraining.com/blog/post/google-maps-api-core-objects-44
//import google from "https://maps.googleapis.com/maps/api/js?key=AIzaSyCegkp704SJvHca7Nl3vergJDs5eXpVV_Q&callback=initMap";
//Center map based on markers https://stackoverflow.com/questions/15719951/auto-center-map-with-multiple-markers-in-google-maps-api-v3
//marker infowindow events https://www.w3schools.com/graphics/google_maps_events.asp

//This runs when the page starts up. It is called by the google API

//                                                  If I wanted to use this to show a limited amount of lighthouses I could use a callback that would filter the list first
function initMap(){
    var center = {lat: 46.78333333, lng: -92.075};
    var bounds = new google.maps.LatLngBounds();
    var map = new google.maps.Map(document.getElementById('map'), {zoom: 10, center: center});

    var data = getLighthouseData();
    
    var allMarkers = [];
    data.forEach(element => {
        //Create Markers
        var marker = new google.maps.Marker({
            position: {
                lat: parseFloat(element.Latitude),
                lng: -parseFloat(element.Longitude)
            },
            title: element.Name,
            clickable: true,
            map: map,
            id: element.id
            //icon: 
        });

        // //Create an infowindow for the marker
        // var infowindow = new google.maps.InfoWindow({
        //     content: 
        // });

        //Add marker to the allMarkers array
        allMarkers.push(marker);

        //Add marker to bounds of the map
        bounds.extend(marker.position);

        //Create events for each marker
        google.maps.event.addListener(marker, 'click', function() {
            // console.log(marker.id);
            map.setCenter(marker.getPosition());
            buildHighlightDiv(marker.id, true);
            
            // infowindow.open(map, marker)
            //map.setCenter(mapsMouseEvent.latLng);
            map.setZoom(10);
        });
    });

    map.fitBounds(bounds);
}

//Retrieve the Lighthouse JSON data
function getLighthouseData(){
    var json = null;
    jQuery.ajax({
      'async': false,
      'global': false,
      'url': "./temp/lighthouses.json",
      'dataType': "json",
      'success': function(data) {
        json = data;
      }
    });
    return json;
}

//Builds the highlight div for the selected lighthouse
function buildHighlightDiv(id, canAdd){
    var lighthouse = getLighthouseData().filter(item => item.id == id)[0];
    const highlighted = document.querySelector("#highlightedSelection");
    
    //Reset highlighted details
    if(document.getElementById("highlightedDetails") != null){
        document.getElementById("highlightedDetails").remove();
    }

    highlighted.dataset.id = lighthouse.id;
    var div = document.createElement('div');
    div.id = "highlightedDetails";
    div.innerHTML = `<h3>${lighthouse.Name}</h3>
                    <table>
                        <tr><th>State</th><td>${lighthouse.State}</td></tr>
                        <tr><th>District</th><td>${lighthouse.District}</td></tr>
                        <tr><th>Latitude</th><td>${lighthouse.Latitude}</td></tr>
                        <tr><th>Longitude</th><td>${lighthouse.Longitude}</td></tr>
                    </table>
                    `;
    
    highlighted.appendChild(div);
    highlighted.classList.remove("hidden");

    //Hides or shows the add button, default is to hide
    if(canAdd){
        document.querySelector("#highlightAdd").classList.remove("hidden");
    } else {
        document.querySelector("#highlightAdd").classList.add("hidden");
    }
    
}

// //Creates a new map with a marker
// function markerTest(){
//     var center = {lat: 46.78333333, lng: -92.075};
//     var map = new google.maps.Map(document.getElementById('map'), {zoom: 10, center: center});
//     var marker = new google.maps.Marker({
//         position: {
//             lat: 46.78333333,
//             lng: -92.0225
//         },
//         title: "NEW MARKER",
//         clickable: true,
//         map: map
//         //icon: 
//     });
// }

function customMarkers(inputMarkers, canAdd){
    var center = {lat: 46.78333333, lng: -92.075};
    var bounds = new google.maps.LatLngBounds();
    var map = new google.maps.Map(document.getElementById('map'), {zoom: 10, center: center});

    //Need to do this incase only one element is sent
    var arrMarkers = []
    if(inputMarkers.length == null){
        arrMarkers.push(inputMarkers);
    } else {
        arrMarkers = inputMarkers;
    }

    var allMarkers = [];
    arrMarkers.forEach(element => {
        var marker = new google.maps.Marker({
            position: {
                lat: parseFloat(element.Latitude),
                lng: -parseFloat(element.Longitude)
            },
            title: element.Name,
            clickable: true,
            map: map,
            id: element.id
        });

        allMarkers.push(marker);
        bounds.extend(marker.position);

        google.maps.event.addListener(marker, 'click', function() {
            map.setCenter(marker.getPosition());
            buildHighlightDiv(marker.id, canAdd);
            map.setZoom(10);
        });
    });
    map.fitBounds(bounds);
}

// function initMap2(){
//     var center = {lat: 46.78333333, lng: -92.075};
//     var map = new google.maps.Map(
//         document.getElementById('map'), {zoom: 10, center: center});
    
    
//     fetch("./temp/lighthousesCleaned.json")
//         .then(response => response.json())
//         .then(result => {
//             //loop through teh list of lighthouses
//             for (const key in result) {
//                 //Creating Markers
//                 /*markers.push(new google.maps.Marker({
//                     position: {
//                         lat: parseFloat(result[key].Latitude),
//                         lng: -parseFloat(result[key].Longitude)
//                     },
//                     title: result[key].Name,
//                     clickable: true,
//                     map: map
//                     //icon: 
//                 }));*/

//                 var marker = new google.maps.Marker({
//                     position: {
//                         lat: parseFloat(result[key].Latitude),
//                         lng: -parseFloat(result[key].Longitude)
//                     },
//                     title: result[key].Name,
//                     clickable: true,
//                     map: map
//                     //icon: 
//                 });

//                 //Adding Event Listeners
                
//                 google.maps.event.addListener(marker, 'click', function(mapsMouseEvent) {
//                     console.log(marker);
//                     //map.setCenter(marker.getPosition());
//                     map.setCenter(mapsMouseEvent.latLng);
//                     map.setZoom(10);
//                     document.getElementById("exampleTest").innerHTML = mapsMouseEvent.latLng;
//                 });
                
                
//                 /*
//                 marker.addListener("click", function(mapsMouseEvent){
//                     //console.log(mapsMouseEvent);
//                     //document.getElementById("exampleTest").innerHTML = mapsMouseEvent.latLng;
//                     map.setCenter(mapsMouseEvent.latLng);
//                     map.setZoom(10);
//                 });
// */

//                 /*
//                 markers[markers.length-1].addListener("click", function() {
//                     console.log(event);
//                     //localStorage.setItem("mapsEvent", JSON.stringify(event));
//                     //console.log(event.view.google.maps.Marker);
//                     //map.setCenter(markers[markers.length-1].getPosition());
//                     document.getElementById("exampleTest").innerHTML = "I clicked on it!";
//                 });
//                 */
//             }
//         });
    
//         /*
//     console.log(markers.length);
//     markers.forEach(marker => {
//         console.log("loop");
//         marker.addListener("click", function() {
//             map.setCenter(marker.getPosition());
//             document.getElementById("exampleTest").innerHTML = "I clicked on it!";
//         });
//     });
// */
// /*
//     console.log(markers);
//     for(let i = 0; i <= 153; i++){
//         console.log("loop");
//         markers[i].addListener("click", function() {
//             map.setCenter(marker.getPosition());
//             document.getElementById("exampleTest").innerHTML = "I clicked on it!";
//         });
//     }
// */



//         //var markerCluster = new MarkerClusterer(map, markers,
//         //    {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
// }




//Search Functions
//https://developers.google.com/places/web-service/search
//searchPlaces();
/*function searchPlaces(){
    const baseURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?";
    const APIKey = "&key=AIzaSyCegkp704SJvHca7Nl3vergJDs5eXpVV_Q";

    let ex = "input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry";
    let fullURL = baseURL + ex + APIKey;
    fetch(fullURL)
        .then(response => response.json())
        .then(results => {
            console.log(results);
        });
    console.log("I did a search!")
}*/
