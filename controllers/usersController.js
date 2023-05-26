const multer = require('multer');
const sharp = require('sharp');

const User = require('./../models/userModel');
const appError = require('./../utils/appErrors');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

// Firebase Configurations
const firebaseApp = require('firebase/app');
const firebaseStorage = require('firebase/storage');

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const fbApp = firebaseApp.initializeApp(firebaseConfig);
const storage = firebaseStorage.getStorage(fbApp, process.env.FIREBASE_STORAGE_BUCKET_URL);

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new appError('Please upload only image!!', 400), false);
  }
};

upload = multer({
  storage: multerStorage,
  filter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

// Resize User profile photo to 500x500
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({
      quality: 90,
    })
    .toBuffer();

  next();
});

// User Profile photo uploading to firebase storage
exports.uploadToFirebase = catchAsync(async (req, res, next) => {
  const storageRef = firebaseStorage.ref(
    storage,
    `user_profile_photos/user-${req.user.id}-${Date.now()}.jpeg`
  );

  if (req.file) {
    const metadata = { contentType: req.file.mimetype };
    const snapshot = await firebaseStorage.uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );
    const getDownloadUrl = await firebaseStorage.getDownloadURL(snapshot.ref);
    req.file.filename = getDownloadUrl;
  }

  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new appError(`Please use another route for updating password...`, 400));
  }

  // 2) Filtering out the field that are not allowed to update
  const filterBody = filterObj(req.body, 'name', 'email');

  console.log(req.file);

  if (req.file) {
    console.log(req.file);
    filterBody.photo = req.file.filename;
  }

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: `This route is not defined! Please use /signup instead`,
  });
};

exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
exports.getAllUsers = factory.getAll(User, { path: 'bookedTours reviews' });
