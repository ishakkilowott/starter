const path = require("path");
const express = require("express");
const tourRouter = require("./routes/tourRoutes");
const reviewRouter = require('./routes/reviewRoutes');
const userRouter = require("./routes/userRoutes");
const viewRouter = require("./routes/viewRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const AppError = require("./Utils/appError");
const globalErrorHandler = require('./Controllers/errorController');
const rateLimit =  require('express-rate-limit');
const helmet = require('helmet');
const cookieParser =  require('cookie-parser');
const compression = require('compression');
const cors = require('cors');


const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// implement CORS
app.use(cors());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'", "https://js.stripe.com"],
//       connectSrc: ["'self'", "https://api.stripe.com"],
//       styleSrc: ["'self'", "'unsafe-inline'"],
//       imgSrc: ["'self'", "data:"],
//       frameSrc: ["https://js.stripe.com"]
//     },
//   })
// );

// add rate limiter to prevent DOS and brute force attack, basically limiting number of request for perticular time.
const limiter = rateLimit({
  max: 100,
  window: 60 * 60 * 1000,
  message : 'Too many request from this Ip, please try again in an hours!'
});
app.use('/api',limiter);

// Body parser , reading data from body into req.body
app.use(express.json({ limit: '10kb'}));
app.use(express.urlencoded({ extended: true, limit: '10kb'}));
app.use(cookieParser());

app.use((req, res, next) => {
  req.reqestTime = new Date().toISOString();
  next();
})

// used to compress the text response sent to client
app.use(compression());

// Routes
app.use("/", viewRouter);
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/bookings", bookingRouter);
// // Route handled for wrong path
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Error handling middleware
app.use(globalErrorHandler);

module.exports = app;
