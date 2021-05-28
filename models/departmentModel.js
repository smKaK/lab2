const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  employees: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Person',
    },
  ],
  name: {
    type: String,
    required: [true, 'There is name?'],
    minLength: [4, 'A name must be longer, than 4 symbols'],
    maxLength: [5000, 'A name must be shorter, than 5000 symbols'],
  },
  description: {
    type: String,
    required: [true, 'There is description?'],
    minLength: [4, 'A description must be longer, than 4 symbols'],
    maxLength: [
      1000,
      'A description must be shorter, than 1000 symbols',
    ],
  },
});

departmentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'employees',
    select: '-__v -job',
  });
  next();
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
