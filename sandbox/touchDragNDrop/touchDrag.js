/************************************************
 * Attempt to create a drag and drop for touch
 ***********************************************/

 //Movement Globals
let canBeDragged = false;
const holdTimer = 1000;
var touchHoldTimer;
let dragHovering = false;

//Event Listeners
//For the draggable element
var dragBox = document.getElementById('dragBox');
dragBox.addEventListener('touchstart', startDrag);
dragBox.addEventListener('touchmove', moveDrag);    //Can I change this?
dragBox.addEventListener('touchend', dropDrag);

//For the dropbox elements
var dropbox = document.getElementById('dropBox');
//dropbox.addEventListener()

//Adding the event listeners to each list item
addTouchDragEventListeners();
function addTouchDragEventListeners(){
    let listItems = document.querySelectorAll('.dragClass');
    listItems.forEach(item => {
        item.addEventListener('touchstart', startDrag);
        item.addEventListener('touchmove', moveDrag);
        item.addEventListener('touchend', dropDrag);
    });
    console.log("Added events");
}




//Event Functions
//Starts a timer before the ability to drag an object is enabled
function startDrag(event){
    console.log("I touched the butt");
    touchHoldTimer = setTimeout(function(){
        console.log("Ding! Timer's up!");
        canBeDragged = true;
        startDraggingCSS(event);
    }, holdTimer);
}

//If dragging is enabled, change the position
//  Prevent scrolling as well
function moveDrag(event){
    event.preventDefault();
    if(canBeDragged){
        console.log("You are dragging me");
        //Position the object where the touch is
        //  Based on center of object
        //console.log(event);
        let x = event.targetTouches[0].pageX; 
        let y = event.targetTouches[0].pageY;
        
        //Open the drop location
        dragOverCheck(document.elementsFromPoint(x, y));

        x = x - (event.target.offsetWidth / 2);
        y = y - (event.target.offsetHeight / 2);
        event.target.style.left = x + 'px';
        event.target.style.top = y + 'px';

    } else {
        console.log("I'm stuck!");
    }
}

//Checks for the nessecary drop conditions
//  Runs a drop function
//  Stops any timeout functions
//  Resets the canBeDragged boolean
function dropDrag(event){
    console.log("You let go of me!");
    
    //I have to use this because the element at those coordinates
    //  will be different by the time I run removeDragOverCSS
    let redundantElement = getHoverDropLoc(event);

    //Run this if there is a valid drop location
    if(dragHovering){
        console.log("I dropped the bass");
        acceptDrop(event);
    } else {
        console.log("I dropped the soap");
    }

    //Cleanup
    clearTimeout(touchHoldTimer);
    if(canBeDragged){   //This will have to be different if dropped
        removeDraggingCSS(event);
        removeDragOverCSS(redundantElement);
    }
    canBeDragged = false;   
}


//Other Functions



//Checks to see if there is a drop location below the drag
function dragOverCheck(elementsBelow){
    let dopLocation;
    console.log(elementsBelow);

    for(let i = 0; i < elementsBelow.length; i++){
        if(elementsBelow[i].className.includes("dropLoc")){
            dragHovering = true;
            dragOverCSS(elementsBelow[i]);
            return;
        } else {
            console.log("This should true " + dragHovering);
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

//Makes the item look draggable
function startDraggingCSS(event){
    
    let dragElement = event.target;
    dragElement.style.backgroundColor = "blue";
    dragElement.style.position = "absolute";
}

//This should only run after the drop is completed, if at all...
function removeDraggingCSS(event){
    let dragElement = event.target;
    dragElement.style.backgroundColor = "white";
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
    element.style.backgroundColor = "white";
}

//Accept the drop when its in the right place
function acceptDrop(event){
    let dropZone = getHoverDropLoc(event);
    console.log("You made it to the danger zone~");
    console.log(dropZone);
    console.log("Here's my data dump");
    console.log(event.target);

    //Now I have to insert the data in ul...
    const daBigList = document.getElementById('ulList');
    daBigList.insertBefore(event.target.parentElement, dropZone.parentElement);

    // return true;
}

function getHoverDropLoc(event){
    console.log(event);
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
