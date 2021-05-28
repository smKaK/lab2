const mongoose = require('mongoose');
const Review = require('../../models/reviewModel');

const text = 'This is test review';
const header = 'Test review';
const rate = 4;

const reviewOne = {
  _id: mongoose.Types.ObjectId(),
  text,
  header,
  rate,
};

const reviewTwo = {
  _id: mongoose.Types.ObjectId(),
  text,
  header,
  rate,
};

const insertReviews = async (reviews) => {
  await Review.insertMany(reviews.map((review) => ({ ...review })));
};

module.exports = {
  reviewOne,
  reviewTwo,
  insertReviews,
};
