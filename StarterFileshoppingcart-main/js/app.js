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
// read the HMTL information of the selected course
function getCourseInfo(course) {
    //Create an Object with Course Data
    const courseInfo =  {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }
    // Insert into the Shopping cart
    addIntoCart(courseInfo);
}
// Display the selected course into the shopping cart

function addIntoCart(course) {
    // create a <tr>
    const row = document.createElement('tr');

    // Build the Template
    row.innerHTML = `
        <tr>
            <td> 
                <img src="${course.image}" width=100>
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                    <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>
    `;
    // Add into the shopping cart
    shoppingCartContent.appendChild(row);

    // Add course into storage
    saveIntoStorage(course);
}
// Add the course into the local storage

function saveIntoStorage(course) {
    let courses = getCoursesFromStorage();

    // add the course into the array
    courses.push(course);

    // since storage only saves strings, we need to convert JSON into string
    localStorage.setItem('courses', JSON.stringify(courses) );
}

//  Get the contents from Storage
function getCoursesFromStorage() {

    let courses;

    // if something exist on storage then we get the value, otherwise create an empty array
    if(localStorage.getItem('courses') === null) {
        courses = [];
    } else {
        courses = JSON.parse(localStorage.getItem('courses') );
    }
    return courses;

}
// remove course from the dom
function removeCourse(e) {
    let course, courseId;

    // Remove from the Dom
    if(e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseId = course.querySelector('a').getAttribute('data-id');
    }
    console.log(courseId);
    // remove from the local storage
    removeCourseLocalStorage(courseId);
}
// remove from local storage
function removeCourseLocalStorage(id) {
    // get the local storage data
    let coursesLS = getCoursesFromStorage();

    // Loop throught the array  and find the index to remove
    coursesLS.forEach(function(courseLS, index) {
        if(courseLS.id === id ) {
            coursesLS.splice(index, 1);
        }
    });
