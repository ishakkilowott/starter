import { login, logout} from "./login";
import {updateSettings} from "./updateSetting";
import { bookTour } from "./stripe";


const form = document.querySelector(".form--login");
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
// const bookBtn = document.getElementById('book-tour');


if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}

if(logOutBtn) logOutBtn.addEventListener('click', logout)

if(userDataForm) {
   userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', document.getElementById("name").value);
    formData.append('email', document.getElementById("email").value);
    
    const photoFile = document.getElementById("photo").files[0];
    console.log('Selected file:', photoFile); // This should now show the file
    
    if (photoFile) {
      formData.append('photo', photoFile);
      console.log('File name:', photoFile.name);
      console.log('File size:', photoFile.size);
      console.log('File type:', photoFile.type);
    }

    // Log all formData entries for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    updateSettings(formData, 'data');
   });
}                

if(userPasswordForm) {
   userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();

    document.querySelector('.btn--save--password').textContent = 'Updating...';
    const passwordCurrent = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    await updateSettings({passwordCurrent, password, passwordConfirm},'password');
    
    document.querySelector('.btn--save--password').textContent= 'Save password';
    document.getElementById("password-current").value= '';
    document.getElementById("password").value= '';
    document.getElementById("password-confirm").value= '';
   })
}        

// if(bookBtn)
//   bookBtn.addEventListener('click', e =>{
//     console.log("tour book is clicked")
//     e.target.textContent= 'Processing...';
//     const { tourId } = e.target.dataset;
//     bookTour(tourId);
// });

document.addEventListener('DOMContentLoaded', () => {
  const bookBtn = document.getElementById('book-tour');
  console.log('Book button:', bookBtn); // Debug: Check if button is found
  if (bookBtn) {
    console.log('Button dataset:', bookBtn.dataset); // Debug: Check dataset
    bookBtn.addEventListener('click', e => {
      console.log('Tour book is clicked'); // Debug: Confirm click
      e.target.textContent = 'Processing...';
      const { tourId } = e.target.dataset;
      console.log('Tour ID:', tourId); // Debug: Confirm tourId
      bookTour(tourId);
    });
  } else {
    console.error('Error: Book button not found in DOM');
  }
});