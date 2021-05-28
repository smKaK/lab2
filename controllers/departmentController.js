const Department = require('../models/departmentModel');
const Person = require('../models/personModel');

const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllDepartments = factory.getAll(Department);
exports.getDepartment = factory.getOne(Department);
exports.createDepartment = factory.createOne(Department);
exports.updateDepartment = factory.updateOne(Department);
exports.deleteDepartment = catchAsync(async (req, res, next) => {
  const doc = await Department.findByIdAndDelete(req.params.id);
  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }
  if (doc.employees) {
    await Promise.all(
      doc.employees.map((id) =>
        Person.findByIdAndUpdate(id, {
          $set: { job: null },
        })
      )
    );
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
