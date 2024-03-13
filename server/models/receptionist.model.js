//Iuliia Chugunova
//Schema of receptionist. Defines data structure, allows connections to database and CRUD operations 
const mongoose = require('mongoose');

const receptionistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    description: 'Name of the receptionist'
  },
  email: {
    type: String,
    required: true,
    match: /^\S+@\S+\.\S+$/,
    description: 'Email address of the receptionist'
  },
  phone: {
    type: String,
    required: true,
    match: /^\+?\d{1,3}-?\d{3}-?\d{3}-?\d{4}$/,
    description: 'Phone number of the receptionist'
  },
  password: {
    type: String,
    required: true,
    description: 'Password of the receptionist'
  }
});

module.exports = mongoose.model('Receptionist', receptionistSchema);
