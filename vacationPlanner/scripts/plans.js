/********************************************
 * Code for the plans class which stores info
 * about a users vacation plans
*********************************************/

import {getDistanceFromLatLonInKm} from './utilities.js';

export default class Vacation {
    constructor(elementId){
        if(localStorage.getItem("vacation") === null){
            this.list = [];
        } else {
            this.list = JSON.parse(localStorage.getItem("vacation"));
        }
        this.plansUL = document.getElementById(elementId);
    }

    addDestination(data){
        this.list.push(data);
        this.buildList();
        updateLocal(this.list);
    }

    deleteDestination(id){
        this.list.splice(this.list.findIndex(item => item.id == id), 1);
        this.buildList();
        updateLocal(this.list);
    }

    //Controller to build the entire UL for the main page
    buildList(){
        this.plansUL.innerHTML = "";
        if(this.list.length < 1){
            let noPlans = document.createElement('li');
            noPlans.innerHTML = "No plans yet!";
            this.plansUL.appendChild(noPlans);
        } else {
            this.list.forEach(item => {
                this.plansUL.appendChild(buildLI(item));
            });

            let finalDiv = document.createElement("div");
            finalDiv.innerHTML = `<div class="dropLoc"></div>`;
            this.plansUL.appendChild(finalDiv);

            //Add event listeners
            addLiEvents();
        }
    }

    reOrderList(){
        var orderedList = [];
        this.plansUL.childNodes.forEach(element =>{
            element.childNodes.forEach(child => {
                if(child.dataset.id != null){
                    orderedList.push(this.list[this.list.findIndex(item => item.id == child.dataset.id)])
                }
            });
        });
        this.list = orderedList;
        updateLocal(this.list);
    }

    showMapMarkers(){
        customMarkers(this.list);
    }

}

//Updates local storage with the users plans
function updateLocal(list){
    localStorage.setItem("vacation", JSON.stringify(list))
}

//Builds each list item with nessecary formatting
function buildLI(item){
    let output = document.createElement("div");
    output.innerHTML = `<div class="dropLoc"></div>`;
    
    let li = document.createElement("li");
    li.dataset.id = item.id; 

    let nameDiv = document.createElement('div');
    let imgDiv = document.createElement('div');
    nameDiv.classList.add("destination_name");
    imgDiv.classList.add("destination_tools");

    nameDiv.innerHTML = item.Name;
    imgDiv.innerHTML = `<img class="destination_delImg" src="./source/images/trashcan.jpg">
                        <img class="destination_dragImg dragClass" src="./source/images/drag.png">`;
    
    li.appendChild(nameDiv);
    li.appendChild(imgDiv);

    output.appendChild(li);
    return output;
}

//Adds touch events for each list item
function addLiEvents(){
    let names = document.querySelectorAll(".destination_name");
    let deletes = document.querySelectorAll(".destination_delImg");
    let drags = document.querySelectorAll(".destination_dragImg");

    //Shows the selected lighthouse in the highlighted section
    names.forEach(li =>{
        li.addEventListener("touchend", (event) =>{
            buildHighlightDiv(event.target.parentElement.dataset.id);
        });
    });

    //Deletes the seletected lighthouse
    deletes.forEach(li =>{
        li.addEventListener("touchend", (event) =>{
            if(window.confirm("Are you sure you want to delete this lighthouse from your plans?")){
                try {
                    new Vacation("usrVacation").deleteDestination(event.target.parentElement.dataset.id);
                    console.log("Successful Delete!");
                } catch (e){
                    console.log("Error deleting destination: " + e);
                }
            }
        });
    });

    //Enables drag events 
    //addTouchDragEventListeners();
    // drags.forEach(li =>{
    //     li.addEventListener("touchend", (event) =>{
    //         console.log("I dragged it...");
    //     });
    // });
}

//Returns the distance between two objects
function getDistance(loc1, loc2){
    return getDistanceFromLatLonInKm(loc1.Latitude, loc1.Longitude, loc2.Latitude, loc2.Longitude);
}

