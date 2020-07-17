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
            console.log(plans);
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


