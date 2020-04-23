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
