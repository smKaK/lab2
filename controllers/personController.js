const Person = require('../models/personModel');
const Department = require('../models/departmentModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createPerson = catchAsync(async (req, res, next) => {
  const doc = await Person.create(req.body);
  if (req.body.job) {
    await Department.findByIdAndUpdate(req.body.job, {
      $push: { employees: doc._id },
    });
  }

  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.getPerson = factory.getOne(Person);
exports.getAllPersons = factory.getAll(Person);
exports.updatePerson = factory.updateOne(Person);
exports.deletePerson = catchAsync(async (req, res, next) => {
  const doc = await Person.findByIdAndDelete(req.params.id);
  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }
  await Department.findByIdAndUpdate(req.params.id, {
    $pull: { employees: req.params.id },
  });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
