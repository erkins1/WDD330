'use strict';
/********************************************
 * Code for the 'My Plans' or Index page
*********************************************/
//Imports
import {getLocation, getDistanceFromLatLonInKm} from './utilities.js';
import Plans from './plans.js';

//Setup processes
const plans = new Plans("usrVacation");
plans.buildList();
showPlansOnMap();   //I think initMap() runs first, then this...


//Testing Functions



//Event Listeners
document.getElementById("closestMapBtn").addEventListener("touchend", findClosestLighthouse);
document.getElementById("allMapBtn").addEventListener("touchend", showAllLighthouses);
document.getElementById("plansMapBtn").addEventListener("touchend", showPlansOnMap);
document.getElementById("highlightAdd").addEventListener("touchend", addToPlans);

document.getElementById("myPlansLnk").addEventListener("touchend", showMyPlans);
document.getElementById("searchLnk").addEventListener("touchend", showSearch);
document.getElementById("mapLnk").addEventListener("touchend", showMap);



//Event Functions
//Changes the view to the plans page
function showMyPlans(){
    //Set the hidden classes to the correct elements
    document.querySelector("#homePg").classList.remove("hidden");
    document.querySelector("#searchPg").classList.add("hidden");
    document.querySelector("#mapPg").classList.add("hidden");
    document.querySelector("#highlightedSelection").classList.add("hidden");
    console.log("Went to the home page");

    //Load the user vacation plans in the map, if there are any
    //Should I even show the map?
    showPlansOnMap();
}

//Changes the view to the search page
function showSearch(){
    //Set the hidden classes to the correct elements
    document.querySelector("#homePg").classList.add("hidden");
    document.querySelector("#searchPg").classList.remove("hidden");
    document.querySelector("#mapPg").classList.add("hidden");
    document.querySelector("#highlightedSelection").classList.add("hidden");
    console.log("Went to the search page");

    //Show all the lighthouses in the map
    initMap();

}

//Changes the view to the map page
function showMap(){
    //Set the hidden classes to the correct elements
    document.querySelector("#homePg").classList.add("hidden");
    document.querySelector("#searchPg").classList.add("hidden");
    document.querySelector("#mapPg").classList.remove("hidden");
    document.querySelector("#highlightedSelection").classList.add("hidden");
    console.log("Went to the map page");

    //Choose a default view for the map
    initMap();
}

//Add lighthouse to the plans
function addToPlans(event){
    let id = event.target.parentElement.dataset.id;
    var lighthouse = getLighthouseData().filter(item => item.id == id)[0];
    plans.addDestination(lighthouse);
    console.log("Added destination");
}

//Shows all the lighthouses on the map
function showAllLighthouses(){
    console.log("Now I've seen everything!");
    initMap();
}

//Finds the closest lighthouse to the users current location
async function findClosestLighthouse(){
    
    var currLocation;
    try{
        currLocation = await getLocation();
    } catch (error){
        console.log("Unable to get location: " + error);
    }
    
    var data = getLighthouseData();
    var closestLighthouse;
    var shortestDistance = 999999999999; //Big number
    data.forEach(element => {
        let distance = getDistanceFromLatLonInKm(currLocation.coords.latitude, currLocation.coords.longitude,
                                                    element.Latitude, -element.Longitude);
        if(shortestDistance > distance){
            shortestDistance = distance;
            closestLighthouse = element;
        }
    });

    buildHighlightDiv(closestLighthouse.id, true);
    customMarkers(closestLighthouse, true);
}


//Other functions
function showPlansOnMap(){
    if(plans.list.length >= 1){
        customMarkers(plans.list, false);
    } else {
        initMap();
    }
}
