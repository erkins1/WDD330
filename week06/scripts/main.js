/* Main is the controller for the todo list */
'use strict';


import ToDo from "./todo.js";
import ToDoItem from "./todoItem.js";

let todo = new ToDo;
todo.displayList("full_todo_list", true);
addEventListeners_todo(); //This creates the event listeners for each todo item

//Testing Stuff

/*****************************************
* Site Navigation
*****************************************/
//Hide/show Delete Menu
const toggleMenu = () => {
    document.querySelector('#delOptions').classList.toggle('show');
    document.querySelector('#delOptions').classList.toggle('hide');
}
document.querySelector('#delMenu').addEventListener('click', toggleMenu);

//Add the event listeners for the nevigation bar
document.querySelector("#all_todo").addEventListener("touchend", seeAll);
document.querySelector("#todo_todo").addEventListener("touchend", seeToDo);
document.querySelector("#complete_todo").addEventListener("touchend", seeComplete);

/*****************************************
* Event Listener declarations
*****************************************/
//Add the event listeners for each of the todo items
function addEventListeners_todo(){
    document.querySelectorAll(".td-edit").forEach(element => {
        element.addEventListener("touchend", edit_ToDo_Item);
    });

    document.querySelectorAll(".td-delete").forEach(element => {
        element.addEventListener("touchend", delete_ToDo_Item);
    });

    document.querySelectorAll(".td-status").forEach(element => {
        element.addEventListener("touchend", status_ToDo_Item);
    });
}

//Delete Menu events
document.querySelector("#del_All").addEventListener("touchend", delete_All);
document.querySelector("#del_Comp").addEventListener("touchend", delete_Completed);

//Add new item
/*
document.querySelector("#submit_buttom").addEventListener("touchend", add_new_todo);
document.querySelector("#new_todo_textbox").addEventListener("touchend", add_new_todo);
*/
document.querySelector("#submitToDo").addEventListener("submit", add_new_todo);

/*****************************************
* Event Listener Functions
*****************************************/
//Functions for individual todo items
function edit_ToDo_Item(event){
    console.log("Clicked to edit");
    let newName = prompt("Edit this todo item:", todo.getNameByTimestamp(event.path[2].id));

    if(newName != null){
        todo.edit(todo.getNameByTimestamp(event.path[2].id), newName);
        resetPage();
    } else {
        alert("You cannot leave the field blank!");
    }

}

function delete_ToDo_Item(event){
    console.log("Clicked to delete");
    if(confirm(`Are you sure you want to delete this To-Do item?\n${todo.getNameByTimestamp(event.path[2].id)}`)){
        todo.delete(event.path[2].id);
        resetPage();
    } else {
        console.log("Canceled");
    }
    
}

function status_ToDo_Item(event){
    console.log("Clicked to change status");

    //If the status is correctly changed, change the strikethough class
    if(todo.toggle(event.path[2].id)){
        event.path[1].classList.toggle("strikethrough");
    }
}

function add_new_todo(event){
    if(event.target[0].value !== null){
        todo.add(event.target[0].value);
    }
    //Why does it automatically refresh every time I add a new one?
    //  Because its a form?
}


//Functions to see different parts of the todo list
function seeAll(){
    setActive("#all_todo");
    resetPage();
}

function seeToDo(){
    setActive("#todo_todo");
    resetPage();
}

function seeComplete(){
    setActive("#complete_todo");
    resetPage();
}

//Functions to delete parts of the todo list
function delete_All(){
    if(confirm("Are you sure you want to delete ALL todo items?")){
        todo.deleteAll();
    }
    resetPage();
}

function delete_Completed(){
    if(confirm("Are you sure you want to delete all COMPLETED todo items?")){
        todo.deleteCompleted();
    }
    resetPage();
}

/*****************************************
* Other Functions
*****************************************/
//Returns the id of the currently active tab
function getActive(){

    if(document.querySelector("#all_todo").classList[0] === "active"){
        return "#all_todo";
    } else if (document.querySelector("#todo_todo").classList[0] === "active"){
       return "#todo_todo"; 
    } else if (document.querySelector("#complete_todo").classList[0] === "active"){
        return "#complete_todo"; 
    } else {
        return "#BAD_ID";
    }
}

function setActive(change_to_active){
    try {
        let currently_active = getActive();

        document.querySelector(currently_active).classList.toggle("active");
        document.querySelector(change_to_active).classList.toggle("active");
    } catch (error) {
        console.log("There was an Error:" + error);
    }
    
}

//reset the page based on the active tab
function resetPage(){
    let currently_active = getActive();

    switch(currently_active){
        case "#all_todo":
            todo.displayList("full_todo_list");
            break;
        case "#todo_todo":
            todo.filterList("full_todo_list", false);
            break;
        case "#complete_todo":
            todo.filterList("full_todo_list", true);
            break;
    }
    addEventListeners_todo();
}
