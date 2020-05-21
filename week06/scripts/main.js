/* Main is the controller for the todo list */
'use strict';


import ToDo from "./todo.js";
import ToDoItem from "./todoItem.js";

let todo = new ToDo;

//Testing Stuff
todo.displayList("full_todo_list", true);

/*****************************************
* Site Navigation
*****************************************/
//Delete Menu
const toggleMenu = () => {
    document.querySelector('#delOptions').classList.toggle('show');
}
document.querySelector('#delMenu').addEventListener('click', toggleMenu);



/*****************************************
* Event Listener declarations
*****************************************/




/*****************************************
* Event Listener Functions
*****************************************/



