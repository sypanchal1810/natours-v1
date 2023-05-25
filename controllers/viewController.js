const Tour = require('./../models/toursModel');
const Booking = require('./../models/bookingModel');
const Review = require('./../models/reviewModel');
const User = require('../models/userModel');

const catchAsync = require('./../utils/catchAsync');
const appError = require('./../utils/appErrors');

let url;

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();

  url = `${req.protocol}://${req.get('host')}`;

  res.status(200).render('overview', {
    title: 'Home',
    tours,
    url,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    return next(new appError(`No Tour exists with this name`, 404));
  }

  url = `${req.protocol}://${req.get('host')}`;

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
    url,
  });
});

exports.getSignupForm = catchAsync(async (req, res, next) => {
  url = `${req.protocol}://${req.get('host')}`;

  res.status(200).render('signup', {
    title: `Create your Account`,
    url,
  });
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
  url = `${req.protocol}://${req.get('host')}`;

  res.status(200).render('login', {
    title: `Login to your Account`,
    url,
  });
});

exports.getMyAccount = catchAsync(async (req, res, next) => {
  url = `${req.protocol}://${req.get('host')}`;

  res.status(200).render('_user-settings', {
    title: `Your Account`,
    url,
  });
});

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1. Find all bookings of user based on user id
  const bookings = await Booking.find({ user: req.user.id });

  // 2. Find all booked tour of that user
  const tourIds = bookings.map(el => el.tour._id);
  const tours = await Tour.find({ _id: { $in: tourIds } });

  res.status(200).render('_user-bookings', {
    title: 'My Tours',
    tours,
  });
});

exports.getMyReviews = catchAsync(async (req, res, next) => {
  // 1. Find all reviews of user based on user id
  const user = await User.findOne({ _id: req.user.id }).populate({
    path: 'reviews',
    fields: 'review rating user tour',
  });

  res.status(200).render('_user-reviews', {
    title: `My Reviews`,
    reviews: user.reviews,
  });
});

exports.getForgotPasswordForm = catchAsync(async (req, res, next) => {
  url = `${req.protocol}://${req.get('host')}`;

  res.status(200).render('forgotPasswordForm', {
    title: 'Forgot Password',
    url,
  });
});

exports.getResetPasswordForm = catchAsync(async (req, res, next) => {
  const resetToken = req.params.resetToken;
  url = `${req.protocol}://${req.get('host')}`;

  res.status(200).render('resetPasswordForm', {
    title: 'Reset Password',
    resetToken,
    url,
  });
});

exports.alerts = catchAsync(async (req, res, next) => {
  const { alert } = req.query;

  if (alert === 'booking') {
    res.locals.alert = `Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up here immediately, please come back later.`;
  }

  next();
});
