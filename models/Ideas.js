const mongoose = require('mongoose');
const format = require('date-fns/format');


const ideaSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  
  hoverable: {
    type: Boolean,
    default: true,
  },
  cover: {
    type: String,
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  date: {
    type: String, 
    default: format(new Date(), 'dd-MM-yyyy'), 
  },
  amount: {
    type: String,
    required: [true, 'Please add an amount'],
  },
  contact: {
    type: String,
    required: [true, 'Please add a contact'],
  },
  ideasDesc: {
    type: mongoose.Schema.Types.Mixed,
  },
});

const Idea = mongoose.model('Idea', ideaSchema);

module.exports = Idea;
