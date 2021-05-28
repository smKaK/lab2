const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  header: {
    type: String,
    minLength: [1, 'An header must be longer, than 1 symbol'],
    maxLength: [500, 'A header must be shorter, than 500 symbols'],
  },
  text: {
    type: String,
    required: [true, 'There is text?'],
    minLength: [1, 'A text must be longer, than 1 symbol'],
    maxLength: [10000, 'A text must be shorter, than 10000 symbols'],
  },
  price: {
    type: Number,
    required: [true, 'There is price?'],
  },
});

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;
