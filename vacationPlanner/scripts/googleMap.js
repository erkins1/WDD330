'use strict';
//import MarkerClusterer from "./libraries/marker/packages/markerclusterer/src/markerclusterer.js";
//https://www.protechtraining.com/blog/post/google-maps-api-core-objects-44
//import google from "https://maps.googleapis.com/maps/api/js?key=AIzaSyCegkp704SJvHca7Nl3vergJDs5eXpVV_Q&callback=initMap";

function initMap(){
    var center = {lat: 46.78333333, lng: -92.075};
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 10, center: center});
    
    
    fetch("./temp/lighthousesCleaned.json")
        .then(response => response.json())
        .then(result => {
            //loop through teh list of lighthouses
            for (const key in result) {
                //Creating Markers
                /*markers.push(new google.maps.Marker({
                    position: {
                        lat: parseFloat(result[key].Latitude),
                        lng: -parseFloat(result[key].Longitude)
                    },
                    title: result[key].Name,
                    clickable: true,
                    map: map
                    //icon: 
                }));*/

                var marker = new google.maps.Marker({
                    position: {
                        lat: parseFloat(result[key].Latitude),
                        lng: -parseFloat(result[key].Longitude)
                    },
                    title: result[key].Name,
                    clickable: true,
                    map: map
                    //icon: 
                })

                //Adding Event Listeners
                /*
                google.maps.event.addListener(markers, 'click', function() {
                    console.log(markers.getPosition());
                    //map.setCenter(marker.getPosition());
                    document.getElementById("exampleTest").innerHTML = "I clicked on it!";
                });
                */
                
                marker.addListener("click", function(mapsMouseEvent){
                    console.log(mapsMouseEvent);
                    document.getElementById("exampleTest").innerHTML = mapsMouseEvent.latLng;
                    map.setCenter(mapsMouseEvent.latLng);
                });


                /*
                markers[markers.length-1].addListener("click", function() {
                    console.log(event);
                    //localStorage.setItem("mapsEvent", JSON.stringify(event));
                    //console.log(event.view.google.maps.Marker);
                    //map.setCenter(markers[markers.length-1].getPosition());
                    document.getElementById("exampleTest").innerHTML = "I clicked on it!";
                });
                */
            }
        });
    
        /*
    console.log(markers.length);
    markers.forEach(marker => {
        console.log("loop");
        marker.addListener("click", function() {
            map.setCenter(marker.getPosition());
            document.getElementById("exampleTest").innerHTML = "I clicked on it!";
        });
    });
*/
/*
    console.log(markers);
    for(let i = 0; i <= 153; i++){
        console.log("loop");
        markers[i].addListener("click", function() {
            map.setCenter(marker.getPosition());
            document.getElementById("exampleTest").innerHTML = "I clicked on it!";
        });
    }
*/



        //var markerCluster = new MarkerClusterer(map, markers,
        //    {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}




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
