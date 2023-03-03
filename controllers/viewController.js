const Tour = require('./../models/toursModel');
const Booking = require('./../models/bookingModel');
const catchAsync = require('./../utils/catchAsync');
const appError = require('./../utils/appErrors');

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).render('overview', {
    title: 'All tours',
    tours,
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

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: `Login to your Account`,
  });
});

exports.getUserAccount = catchAsync(async (req, res, next) => {
  res.status(200).render('account', {
    title: `Your Account`,
  });
});

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1. Find all bookings of user based on user id
  const bookings = await Booking.find({ user: req.user.id });

  // 2. Find all booked tour of that user
  const tourIds = bookings.map(el => el.tour._id);
  const tours = await Tour.find({ _id: { $in: tourIds } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours,
  });
});
