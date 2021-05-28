const express = require('express');
const skillController = require('../controllers/skillController');
// const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');

const router = express.Router();
// const checkForExistUser = catchAsync(async (req, res, next) => {
//   const exist = await User.findById(req.body.customer);
//   if (!exist) {
//     return next(new AppError('No user found with that ID', 404));
//   }
//   next();
// });

router
  .route('/')
  .get(skillController.getAllSkills)
  .post(skillController.createSkill);

router
  .route('/:id')
  .get(skillController.getSkill)
  .patch(skillController.updateSkill)
  .delete(skillController.deleteSkill);

module.exports = router;
