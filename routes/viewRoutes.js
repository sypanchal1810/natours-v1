const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');
const bookingController = require('./../controllers/bookingController');

const router = express.Router();

router.use(viewController.alerts);

router.get('/', authController.isLoggedIn, viewController.getOverview);
router.get('/tour/:slug', authController.isLoggedIn, viewController.getTour);
router.get('/signup', authController.isLoggedIn, viewController.getSignupForm);
router.get('/login', authController.isLoggedIn, viewController.getLoginForm);
router.get('/my-account', authController.protect, viewController.getMyAccount);

router.get('/forgot-password', viewController.getForgotPasswordForm);
router.get('/resetPassword/:resetToken', viewController.getResetPasswordForm);

router.get(
  '/my-tours',
  // bookingController.createBookingCheckout,
  authController.protect,
  viewController.getMyTours
);

router.get('/my-reviews', authController.protect, viewController.getMyReviews);

module.exports = router;
