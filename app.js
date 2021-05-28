const path = require('path');
const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');

const globalErrorHandler = require('./controllers/errorController');

const offerRouter = require('./routes/offerRouter');
const personRouter = require('./routes/personRouter');
const skillRouter = require('./routes/skillRouter');
const reviewRouter = require('./routes/reviewRouter');
const departmentRouter = require('./routes/departmentRouter');

//creating server
const app = express();

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// 1) GLOBAL MIDDLEWARE

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//ROUTES

//api
app.use('/api/v1/offers', offerRouter);
app.use('/api/v1/person', personRouter);
app.use('/api/v1/skills', skillRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/departments', departmentRouter);

app.use(globalErrorHandler);

//404 handler
app.all('*', (req, res, next) => {
  next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

//Export server
module.exports = app;
