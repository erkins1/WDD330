/* Class definition for the ToDo object */

import ToDoItem from "./todoItem.js";


export default class ToDo {
    //Constructor check for or builds a todo array in local storage
    //Is it better to just save the elementId here?
    constructor(){
        if(localStorage.getItem("myToDoList") === null){
            this.list = [];
        } else {
            this.list = JSON.parse(localStorage.getItem("myToDoList"));
        }
        
    }

    //Build the entire todo list
    displayList(elementId) {
        clearElement(elementId);
        if(this.list.length < 1){
            document.getElementById(elementId).appendChild(buildEmptyItem());
        } else {
            this.list.forEach(item => {
                document.getElementById(elementId).appendChild(buildToDoItem(item));
            });
        }
    }

    //Override to filter the list by completion
    filterList(elementId, filter){
        clearElement(elementId);
        if(this.list.length < 1){
            document.getElementById(elementId).appendChild(buildEmptyItem());
        } else {
            this.list.forEach(item => {
                if(item.Status === filter){
                    document.getElementById(elementId).appendChild(buildToDoItem(item));
                }
            });
        }
    }

    count(){
        return this.list.length;
    }

    indexOf(timestamp){
        for (let i = 0; i < this.list.length; i++){
            if(this.list[i].Timestamp == timestamp){
                return i;
            }
        }

        return -1;
    }

    //Add a new to the todo list
    //                                      Should this check for dupes?
    add(todo_item){
        this.list.push(new ToDoItem(todo_item));
        //console.log(this.list);
        updateLocal(this.list);
    }

    //Delete a todo item
    //                                      Could use a try catch block instead
    delete(timestamp){
        if(this.indexOf(timestamp) != -1){
            this.list.splice(this.indexOf(timestamp), 1);
            updateLocal(this.list);
            return true;
        } else {
            console.log("Failed to delete timestamp " + timestamp);
            return false;
        }
    }
    
    //Delete the completed todo items
    deleteCompleted(){
        this.list = this.list.filter(item => item.Status === false);
        updateLocal(this.list);
    }

    deleteAll(){
        this.list = [];
        updateLocal(this.list);
    }

    //Toggle the completion status of a todo item
    //                                                          Sometimes seems to run twice?
    toggle(timestamp){
        if(this.indexOf(timestamp) != -1){
            this.list[this.indexOf(timestamp)].Status = !this.list[this.indexOf(timestamp)].Status;
            updateLocal(this.list);
            return true;
        } else {
            console.log("Failed to toggle timestamp " + timestamp);
            return false;
        }
    }

    //Edit the name of a todo item
    edit(timestamp, new_name){
        if(this.indexOf(timestamp) != -1){
            this.list[this.indexOf(timestamp)].Name = new_name;
            updateLocal(this.list);
            return true;
        } else {
            console.log("Failed to edit timestamp " + timestamp);
            return false;
        }
    }
    
    //get the name by timestamp
    getNameByTimestamp(timestamp){
        return this.list[this.indexOf(timestamp)].Name;
    }

}

//Clears the UL that holds the todo list
function clearElement(elementId){
    document.getElementById(elementId).innerHTML = "";
}

//Builds the HTML for a single todo item
function buildToDoItem(item){
    let output = document.createElement("li");

    let checked = "";
    let strikethrough = "";
    if(item.Status === true){
        checked = "checked";
        strikethrough = "strikethrough";
    }

    //Add the timestamp id
    output.id = item.Timestamp;

    output.innerHTML = `<div class="td-status ${strikethrough}">
        <input type="checkbox" id="td-${item.Timestamp}" value="${item.Status}" ${checked}>
        <label for="td-${item.Timestamp}" >${item.Name}</label>
    </div>
    <div>
        <p class="fas td-edit">&#xf303;</p>
        <p class="fa td-delete" >&#xf014;</p>
    </div>`;
    
    //console.log(output);
    return output;
}

function buildEmptyItem(){
    let output = document.createElement("li");
    output.innerHTML = "No To-Do items! Hooray!";
    return output;
}

//Run every time the list is changed so that local storage is always updates
function updateLocal(list){
    localStorage.setItem("myToDoList", JSON.stringify(list));
}
