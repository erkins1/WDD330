/************************************************
 * Attempt to create a drag and drop for touch
 ***********************************************/

 //Movement Globals
let canBeDragged = false;
const holdTimer = 1000;
var touchHoldTimer;

//Event Listeners
//For the draggable element
var dragBox = document.getElementById('dragBox');
dragBox.addEventListener('touchstart', startDrag);
dragBox.addEventListener('touchmove', moveDrag);    //Can I change this?
dragBox.addEventListener('touchend', dropDrag);

//For the dropbox elements
var dropbox = document.getElementById('dropBox');
//dropbox.addEventListener()

//Event Functions
//Starts a timer before the ability to drag an object is enabled
function startDrag(event){
    
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
    
    //Cleanup
    clearTimeout(touchHoldTimer);
    canBeDragged = false;   
}


//Other Functions

//Makes the item look draggable
function startDraggingCSS(event){
    
    let dragElement = event.target;
    dragElement.style.backgroundColor = "blue";
    dragElement.style.position = "absolute";
}

function dragOverCheck(elementsBelow){
    let dopLocation;
    elementsBelow.forEach(element => {
        if(element.id == "dropBox"){
            dragOverCSS(element);
            return;
        }
    });
}

function dragOverCSS(element){
    element.style.backgroundColor = "red";
}

