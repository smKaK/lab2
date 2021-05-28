const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
    minLength: [2, 'A name must be longer, than 2 symbols'],
    maxLength: [50, 'A name must be shorter, than 50 symbols'],
  },
  skills: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Skill',
    },
  ],
  job: {
    type: mongoose.Schema.ObjectId,
    ref: 'Department',
    default: null,
  },
});

personSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'job',
    select: '-__v -employees -_id',
  }).populate({
    path: 'skills',
    select: '-__v -_id',
  });
  next();
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
