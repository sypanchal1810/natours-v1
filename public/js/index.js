/* eslint-disable */
import '@babel/polyfill';
import axios from 'axios';

import { displayMap } from './mapbox';
import { login, logout } from './login';
import { signup } from './signup';
import { forgotPassword } from './forgotPassword';
import { resetPassword } from './resetPassword';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';
import { showAlert } from './alerts';

// DOM ELEMENTS
const mapBox = document.getElementById('map');

const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');

const signupForm = document.querySelector('.form--signup');
const forgotPasswordForm = document.querySelector('.form--forgotPassword');
const resetPasswordForm = document.querySelector('.form--resetPassword');

const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');

const bookBtn = document.getElementById('book-tour');

const alertMessage = document.querySelector('body').dataset.alert;

let navCheckbox = document.querySelector('.nav__checkbox');
let navLinks = document.querySelectorAll('.nav__link');

const scrollToTopBtn = document.getElementById('scrollToTop');

// Side nav links
let sideNavLinks = document.querySelectorAll('.side-nav--link');

// DELEGATION

// Toggle the active class in side nav of user profile
if (sideNavLinks) {
  const url = window.location.href;

  sideNavLinks.forEach(link => {
    if (url.includes('my-account') && link.textContent.includes('Settings')) {
      link.classList.toggle('side-nav--active');
    }

    if (url.includes('my-tours') && link.textContent.includes('My Bookings')) {
      link.classList.toggle('side-nav--active');
    }

    if (url.includes('my-reviews') && link.textContent.includes('My Reviews')) {
      link.classList.toggle('side-nav--active');
    }
  });
}

// Scroll to Top Button
if (scrollToTopBtn) {
  window.onscroll = () => {
    if (
      document.body.scrollTop > window.innerHeight ||
      document.documentElement.scrollTop > window.innerHeight
    ) {
      scrollToTopBtn.style.opacity = 1;
      scrollToTopBtn.style.display = 'block';
    } else {
      scrollToTopBtn.style.opacity = 0;
      scrollToTopBtn.style.display = 'none';
    }
  };

  scrollToTopBtn.addEventListener('click', function (e) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
}

// For mobile navigation
if (navCheckbox) {
  do {
    navLinks.forEach(link =>
      link.addEventListener('click', () => {
        navCheckbox.checked = false;
      })
    );
  } while (navCheckbox.checked);
}

if (alertMessage) showAlert('success', alertMessage, 20);

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (signupForm)
  signupForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('confirm-password').value;

    signup(name, email, password, passwordConfirm);
  });

if (forgotPasswordForm)
  forgotPasswordForm.addEventListener('submit', e => {
    e.preventDefault();

    const email = document.getElementById('email').value;

    forgotPassword(email);
  });

if (resetPasswordForm)
  resetPasswordForm.addEventListener('submit', e => {
    e.preventDefault();

    const { resetToken } = document.getElementById('change-password').dataset;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('confirm-password').value;

    console.log(resetToken, password, passwordConfirm);
    resetPassword(password, passwordConfirm, resetToken);
  });

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (logOutBtn)
  logOutBtn.addEventListener('click', async e => {
    e.preventDefault();
    try {
      const res = await axios({
        method: 'GET',
        url: '/api/v1/users/logout',
      });

      if ((res.data.status = 'success')) {
        showAlert('success', 'Logging Out...!');
        window.setTimeout(() => {
          location.assign('/');
        }, 2000);

        window.setTimeout(() => {
          location.reload(true);
        }, 3000);
      }
    } catch (err) {
      // console.log(err.response);
      showAlert('error', 'Error while Logging Out! Try again.');
    }
  });

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files?.[0]);

    updateSettings(form, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const oldPassword = document.getElementById('password-current').value;
    const newPassword = document.getElementById('password').value;
    const newPasswordConfirm = document.getElementById('password-confirm').value;
    await updateSettings({ oldPassword, newPassword, newPasswordConfirm }, 'password');

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (bookBtn) {
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}
