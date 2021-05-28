const Skill = require('../models/skillModel');
const Person = require('../models/personModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createSkill = factory.createOne(Skill);
exports.getSkill = factory.getOne(Skill);
exports.getAllSkills = factory.getAll(Skill);
exports.updateSkill = factory.updateOne(Skill);
exports.deleteSkill = catchAsync(async (req, res, next) => {
  const doc = await Skill.findById(req.params.id);
  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }
  await Person.updateMany(
    { skills: doc._id },
    {
      $pull: { skills: doc._id },
    }
  );
  await Skill.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
