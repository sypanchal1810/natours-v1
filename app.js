const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const cookieSession = require('cookie-session');

const appError = require('./utils/appErrors');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/toursRoutes');
const userRouter = require('./routes/usersRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const viewRouter = require('./routes/viewRoutes');

const bookingController = require('./controllers/bookingController');
const authController = require('./controllers/authController');

const User = require('./models/userModel');
const Email = require('./utils/email');

const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

const app = express();

app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware

// Implementing CORS
app.use(cors());
// Access-Control-Allow-Origin *
// api.natours.com, front-end natours.com
// app.use(cors({
//   origin: 'https://www.natours.com'
// }))

app.options('*', cors());
// app.options('/api/v1/tours/:id', cors());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
// app.use(helmet());
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// Stripe webhook, BEFORE body-parser, because stripe needs the body as stream
app.post('/webhook', express.raw({ type: 'application/json' }), bookingController.webhookCheckout);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 3600 * 1000,
  message: `Too many requests from this IP, please try again later in an hour`,
});
app.use('/api', limiter);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

app.use(compression());

// 3rd party middleware
// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

// Passport.js for OAuth
const googleOAuthOptions = {
  clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
};
const verifyCallback = async (accessToken, refreshToken, profile, done) => {
  const userProfile = profile;
  // console.log('User Profile', userProfile);

  try {
    // Check if user already exists in the database
    const user = await User.findOne({
      googleId: userProfile.id,
      email: userProfile.emails[0].value,
    });
    // console.log(user, 'found');

    // If User exists, pass the user object to the callback
    if (user) return done(null, user);

    // User doesn't exist, Create new user
    const newUser = await User.create({
      googleId: userProfile.id,
      name: userProfile.displayName,
      email: userProfile.emails[0].value,
      photo: userProfile.photos[0].value,
      active: true,
      activatedAt: Date.now(),
      createdAt: Date.now(),
    });

    // Save the new user to the database
    const savedUser = await newUser.save({ validateBeforeSave: false });
    return done(null, savedUser);
  } catch (err) {
    console.log(err);
    return done(err, false);
  }
};
passport.use(new Strategy(googleOAuthOptions, verifyCallback));

// Save the session to the cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Read the session from the cookie
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

app.use(
  cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.JWT_SECRET_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    // successRedirect: '/',
    failureRedirect: '/login',
    session: true,
  }),
  authController.LoggedInWithGoogle,
  authController.isLoggedIn,
  async (req, res, next) => {
    // console.log('Callback from google');
    res.redirect('/');
  }
);

// Mounting the routers
// Own Middleware
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  next(new appError(`Cannot find the ${req.originalUrl} on this server!!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
