// Variables
const courses = document.querySelector('#courses-list'),
      shoppingCartContent = document.querySelector('#cart-content tbody'),
      clearCartBtn = document.querySelector('#clear-cart');
// Listeners

loadEventListeners();

function loadEventListeners() {
    // when a new course is added
    courses.addEventListener('click', buyCourse);

    // When the remove button is Clicked
    shoppingCartContent.addEventListener('click', removeCourse);

    // Clear Cart Btn
    clearCartBtn.addEventListener('click', clearCart);

    // document ready
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);
}
// Functions
function buyCourse(e) {
    e.preventDefault();
    // use the delegation to find the course that was added
    if(e.target.classList.contains('add-to-cart')) {
       // read the course values
        const course = e.target.parentElement.parentElement;

        // read the values
        getCourseInfo(course);
    }
}