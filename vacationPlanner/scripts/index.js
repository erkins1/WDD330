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
addTouchDragEventListeners();
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
    //Add the active CSS class
    document.querySelector("#myPlansLnk").classList.add("active");
    document.querySelector("#searchLnk").classList.remove("active");
    document.querySelector("#mapLnk").classList.remove("active");
    
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
    //Add the active CSS class
    document.querySelector("#myPlansLnk").classList.remove("active");
    document.querySelector("#searchLnk").classList.add("active");
    document.querySelector("#mapLnk").classList.remove("active");

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
    //Add the active CSS class
    document.querySelector("#myPlansLnk").classList.remove("active");
    document.querySelector("#searchLnk").classList.remove("active");
    document.querySelector("#mapLnk").classList.add("active");
    
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










//I would love to separate this, but I need access to the plans object

/************************************************
 * Touch enabled drag and drop
 ***********************************************/

/************************************************
 * Global Declarations
 ***********************************************/
let canBeDragged = false;
const holdTimer = 1000;
var touchHoldTimer;
let dragHovering = false;

/************************************************
 * Event Listener Declarations
 ***********************************************/
//For the draggable items
//  Draggable elements need a dragClass class
//  Drop locations need a dropLoc class
function addTouchDragEventListeners(){
    let listItems = document.querySelectorAll('.dragClass');
    listItems.forEach(item => {
        item.addEventListener('touchstart', startDrag);
        item.addEventListener('touchmove', moveDrag);
        item.addEventListener('touchend', dropDrag);
    });
}


/************************************************
 * Event Functions
 ***********************************************/
//Starts a timer before the ability to drag an object is enabled
function startDrag(event){
    touchHoldTimer = setTimeout(function(){
        canBeDragged = true;
        startDraggingCSS(event);
    }, holdTimer);
}

//If dragging is enabled, change the position
//  Prevent scrolling as well
function moveDrag(event){
    event.preventDefault();
    if(canBeDragged){       
        let x = event.targetTouches[0].pageX; 
        let y = event.targetTouches[0].pageY;
        
        //trigger the drop location
        dragOverCheck(document.elementsFromPoint(x, y));
        //Position the object where the touch is
        //  Based on center of object
        x = x - (event.target.offsetWidth / 2);
        y = y - (event.target.offsetHeight / 2);
        event.target.style.left = x + 'px';
        event.target.style.top = y + 'px';
    } 
}

//Checks for the nessecary drop conditions
//  Runs a drop function
//  Stops any timeout functions
//  Cleans up CSS changes
//  Resets the canBeDragged boolean
function dropDrag(event){    
    //I have to use this because the element at those coordinates
    //  will be different by the time I run removeDragOverCSS
    let redundantElement = getHoverDropLoc(event);
    let completedDrop = false;
    try{
        //This runs if there is a valid drop location
        if(dragHovering){
            completedDrop = acceptDrop(event);
        } 
        if(completedDrop){
            //canICallFromTouch();
            plans.reOrderList();
        }
    } catch (e){
        console.log("There was an error dropping the element: " + e);
    } finally {
        //Cleanup has to happen no matter what
        clearTimeout(touchHoldTimer);
        if(canBeDragged){  
            removeDraggingCSS(event);
            if(redundantElement != -1){
                removeDragOverCSS(redundantElement);
            }
        }
        canBeDragged = false;  
    } 
}


/************************************************
 * Functions to help with the events
 ***********************************************/
//Checks to see if there is a drop location below the drag
function dragOverCheck(elementsBelow){
    for(let i = 0; i < elementsBelow.length; i++){
        if(elementsBelow[i].className.includes("dropLoc")){
            dragHovering = true;
            dragOverCSS(elementsBelow[i]);
            return;
        } else {
            dragHovering = false;
        }
    }

    if(!dragHovering){
        //Select all the drop locations
        document.querySelectorAll('.dropLoc').forEach(dropLoc => {
            //loop through and check if they have a hover class
            //if they do, remove and reset CSS changes
            if(dropLoc.className.includes("dragHover")){
                dropLoc.classList.remove("dragHover");
                removeDragOverCSS(dropLoc);
            }
        });
    }
}

//Accept the drop when its in the right place
function acceptDrop(event){
    let dropZone = getHoverDropLoc(event);

    //Now I have to insert the data in ul...
    const daBigList = document.getElementById('usrVacation');
    var movingItem = event.path[3];    

    daBigList.insertBefore(movingItem, dropZone.parentElement);

    return true;
}

//Returns an element with the dropLoc class
//  If there is a valid one below the cursor
function getHoverDropLoc(event){
    let x = event.changedTouches[0].pageX; 
    let y = event.changedTouches[0].pageY;
    
    let elementsBelow = document.elementsFromPoint(x, y);
    for(let i = 0; i < elementsBelow.length; i++){
        if(elementsBelow[i].className.includes("dropLoc")){
            return elementsBelow[i];
        }
    }
    return -1;
}

/************************************************
 * CSS related Functions
 ***********************************************/
//Makes the item look draggable
function startDraggingCSS(event){
    let dragElement = event.target;
    dragElement.style.backgroundColor = "blue";
    dragElement.style.position = "absolute";
}

//This should only run after the drop is completed, if at all...
function removeDraggingCSS(event){
    let dragElement = event.target;
    // dragElement.style.backgroundColor = "white";
    dragElement.style.removeProperty("background-color");
    dragElement.style.position = "static";
}

//Might not need to add these two functions 
//  if I can get css priority correct
function dragOverCSS(element){
    //add a drag hover class
    element.classList.add("dragHover");
    element.style.backgroundColor = "black";
}

function removeDragOverCSS(element){
    element.style.removeProperty("background-color");
}


