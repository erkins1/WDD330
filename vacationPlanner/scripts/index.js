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


//Testing Functions




//Event Listeners
document.getElementById("closestMapBtn").addEventListener("touchend", findClosestLighthouse);
document.getElementById("allMapBtn").addEventListener("touchend", showAllLighthouses);
document.getElementById("highlightAdd").addEventListener("touchend", addToPlans);


//Event Functions
//Changes the view to the plans page
//Changes the view to the search page
//Changes the view to the map page

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

    buildHighlightDiv(closestLighthouse.id);
    customMarkers(closestLighthouse);
}


//Other functions
