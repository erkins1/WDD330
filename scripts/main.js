/***************************************
 * 
***************************************/

//Method to create a dropdown menu
//Arrow syntax
const toggleMenu = () => {
    document.querySelector('#navigation').classList.toggle('show');
}
//Creates an event listener (Order matters for arrow syntax)
document.querySelector('#navigation').addEventListener('click', toggleMenu);

//Method to hide and show weekly notes
//This adds/removes the show class to the section. It might be wothwhile to adjust this later
const toggleNotes = () => {
    document.querySelector('#weeklyNotes').classList.toggle('show');
    document.querySelector('#weeklyNotes').classList.toggle('hide');
}
//Creates an event listener (Order matters for arrow syntax)
document.querySelector('#showNotes').addEventListener('click', toggleNotes);

