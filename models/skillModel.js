const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
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

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
