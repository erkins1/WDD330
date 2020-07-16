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
