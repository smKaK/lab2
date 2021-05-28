const express = require('express');
const personController = require('../controllers/personController');

const router = express.Router();

router
  .route('/')
  .get(personController.getAllPersons)
  .post(personController.createPerson);

router
  .route('/:id')
  .get(personController.getPerson)
  .patch(personController.updatePerson)
  .delete(personController.deletePerson);

module.exports = router;
