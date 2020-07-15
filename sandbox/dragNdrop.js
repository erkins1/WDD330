//A drag and drop template
//Just needs to run the addEvents function after the lis are created

//Apply the event listener to each li in the ul
const ulList = document.querySelector("#ulList");

//Runs when user starts the drag action
//  Saves the target html to the event
function dragStartHandler(event){
    event.dataTransfer.setData("text/html", event.target.parentElement.outerHTML)
}

//Runs when the user drags element off the drop box
//  removes the dragHover class
function dragLeaveHandler(event){
    event.target.classList.remove("dragHover");
}

//Runs when the user releases the drag over a drop box
//  Writes the dragged element to the correct location
function dropHandler(event){
    try{
        event.target.classList.remove("dragHover");
        let draggedElement = document.createElement('div');
        draggedElement.innerHTML = event.dataTransfer.getData("text/html");
        
        let belowElement = event.target.parentElement;
        ulList.insertBefore(draggedElement.firstChild, belowElement);

        event.dataTransfer.dropEffect = "move";
    } catch (e){
        console.log("There was an error moving the element: " + e);
    }
}

//Runs when dragged element is over a drop box
//  Adds a dragHover class for CSS rules
function dragOverHandler(event){
    event.preventDefault(); //Need this to allow the drop event
    event.target.classList.add("dragHover");
}

//Runs after the drop action is completed
//  Should erase the original target IF the drop was successful
function dragEndHandler(event){
    if(event.dataTransfer.dropEffect == "move"){
        event.target.parentElement.remove();
    }
    addEvents();
}


function addEvents(){
    ulList.childNodes.forEach(element => {
    //element.addEventListener("dragstart", dragStartHandler);
    //Need to set different events for li and divs
        element.childNodes.forEach(child => {
            if(child.className != null && child.className.includes("dragClass")){
                child.addEventListener("dragstart", dragStartHandler);
                child.addEventListener("dragend", dragEndHandler)
            } else if(child.className != null && child.className.includes("dropLoc")){
                child.addEventListener("dragleave", dragLeaveHandler)
                child.addEventListener("drop", dropHandler)
                child.addEventListener("dragover", dragOverHandler)
            }
        })
    });
}