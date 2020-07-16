//A drag and drop template

export default class DragNDrop {
    constructor(elementId){
        this.ulList = document.getElementById(elementId);
        this.addEvents();
    }

    //                                      I am unable to call this function from an event for some reason (end of dragEndHandler)
    //Assign the event listener to each li in the ul
    addEvents(){
        document.getElementById("ulList").childNodes.forEach(element => {
            //element.addEventListener("dragstart", this.dragStartHandler);
            //Need to set different events for li and divs
            element.childNodes.forEach(child => {
                if(child.className != null && child.className.includes("dragClass")){
                    child.addEventListener("dragstart", this.dragStartHandler);
                    child.addEventListener("dragend", this.dragEndHandler)
                } else if(child.className != null && child.className.includes("dropLoc")){
                    child.addEventListener("dragleave", this.dragLeaveHandler)
                    child.addEventListener("drop", this.dropHandler)
                    child.addEventListener("dragover", this.dragOverHandler)
                }
            });
        });
    }

    //Runs when user starts the drag action
    //  Saves the target html to the event
    dragStartHandler(event){
        event.dataTransfer.setData("text/html", event.target.parentElement.outerHTML)
    }

    //Runs when the user drags element off the drop box
    //  removes the dragHover class
    dragLeaveHandler(event){
        event.target.classList.remove("dragHover");
    }

    //Runs when the user releases the drag over a drop box
    //  Writes the dragged element to the correct location
    dropHandler(event){
        try{
            event.target.classList.remove("dragHover");
            let draggedElement = document.createElement('div');
            draggedElement.innerHTML = event.dataTransfer.getData("text/html");
            
            let belowElement = event.target.parentElement;
            let newElement = ulList.insertBefore(draggedElement.firstChild, belowElement);

            //Add back the event listeners that were missing
            newElement.childNodes.forEach(child => {
                if(child.className != null && child.className.includes("dragClass")){
                    child.addEventListener("dragstart", this.dragStartHandler);
                    child.addEventListener("dragend", this.dragEndHandler)
                } else if(child.className != null && child.className.includes("dropLoc")){
                    child.addEventListener("dragleave", this.dragLeaveHandler)
                    child.addEventListener("drop", this.dropHandler)
                    child.addEventListener("dragover", this.dragOverHandler)
                }
            });

            event.dataTransfer.dropEffect = "move";
        } catch (e){
            console.log("There was an error moving the element: " + e);
        }
    }

    //Runs when dragged element is over a drop box
    //  Adds a dragHover class for CSS rules
    dragOverHandler(event){
        event.preventDefault(); //Need this to allow the drop event
        event.target.classList.add("dragHover");
    }

    //Runs after the drop action is completed
    //  Should erase the original target IF the drop was successful
    dragEndHandler(event){
        if(event.dataTransfer.dropEffect == "move"){
            event.target.parentElement.remove();
        }

    }




}


