import { login, logout} from "./login";
import {updateSettings} from "./updateSetting";
import { bookTour } from "./stripe";


const form = document.querySelector(".form--login");
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');


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
    
    if (photoFile) {
      formData.append('photo', photoFile);
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

if(bookBtn)
  bookBtn.addEventListener('click', e => {
    e.preventDefault();
    const button = e.currentTarget; // ensures you get the button itself
    console.log("tour book is clicked");
    button.textContent = 'Processing...';
    const { tourId } = button.dataset;
    if (!tourId) {
      console.error("tourId is undefined!");
      return;
    }
    bookTour(tourId);
});

