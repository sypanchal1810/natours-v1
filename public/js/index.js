/* eslint-disable */
import '@babel/polyfill';
import axios from 'axios';

import { showAlert } from './alerts';
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { signup } from './signup';
import { forgotPassword } from './forgotPassword';
import { resetPassword } from './resetPassword';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';
import { submitReview } from './submitReview';
import { updateReview } from './updateReview';

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

// Scroll to Top
const scrollToTopBtn = document.getElementById('scrollToTop');
const headerNav = document.querySelector('.header');

// Overview page Navigation
let navCheckbox = document.querySelector('.nav__checkbox');
let navLinks = document.querySelectorAll('.nav__link');

// User Profile Navigation
let sideNavLinks = document.querySelectorAll('.side-nav--link');

// Submit Review
const submitReviewForm = document.querySelector('.form--submit-review');
const submitReviewBtn = document.querySelector('#btn--submit-review');

// Update Review
const updateReviewForm = document.querySelector('.form--update-review');
const updateReviewBtn = document.querySelector('#btn--update-review');
const deleteReviewBtn = document.querySelector('#delete__review--btn');

// Delete The Tour Review
if (deleteReviewBtn) {
  deleteReviewBtn.addEventListener('click', async e => {
    const id = e.target.dataset.reviewId;

    try {
      const res = await axios({
        method: 'DELETE',
        url: `/api/v1/reviews/${id}`,
      });

      if (!res.data.data) {
        showAlert('success', 'Your tour review has been deleted successfully...!');
        window.setTimeout(() => {
          location.reload(true);
        }, 2000);
      }
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
  });
}

// Update The Tour Review
if (updateReviewForm) {
  updateReviewForm.addEventListener('submit', e => {
    e.preventDefault();
    const review = document.getElementById('review').value;
    const rating = document.getElementById('rating').value;
    const id = updateReviewBtn.dataset.reviewId;

    updateReview(id, { review, rating });
  });
}

// Submit The Tour Review
if (submitReviewForm) {
  document.querySelector('.apply').classList.add('backgroundTourImage');

  submitReviewForm.addEventListener('submit', e => {
    e.preventDefault();

    const { tourId, userId } = submitReviewBtn.dataset;
    const review = document.getElementById('review').value;
    const rating = document.getElementById('rating').value;
    const tour = tourId;
    const user = userId;

    submitReview({ review, rating, tour, user });
  });
}

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
window.onscroll = () => {
  if (
    document.body.scrollTop > window.innerHeight ||
    document.documentElement.scrollTop > window.innerHeight
  ) {
    scrollToTopBtn.style.opacity = 1;
    scrollToTopBtn.style.display = 'block';
    headerNav.classList.add('header-sticky');
  } else {
    scrollToTopBtn.style.opacity = 0;
    scrollToTopBtn.style.display = 'none';
    headerNav.classList.remove('header-sticky');
  }
};
scrollToTopBtn.addEventListener('click', function (e) {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

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

    signup({ name, email, password, passwordConfirm });
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
    resetPassword(password, passwordConfirm, resetToken);
  });

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userVerify = document.getElementById('user-verify');
    userVerify
      ? login(email, password, 'activate', userVerify.dataset.activationToken)
      : login(email, password);
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
