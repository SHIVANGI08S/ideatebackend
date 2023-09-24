const mongoose = require('mongoose');
const { Schema } = mongoose;

const user = new Schema({
    
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true, // Use 'unique' to make the 'email' field unique 
    },
    // password need not be unique
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    contact: {
        type: String,
        required: [true, 'Please add a contact number'],
        unique: true, 
    },
});

module.exports = mongoose.model('user', user);
