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
  },
  role: {
    type: String,
    required: true,
    description: 'User role(patient, doctor or receptionist)'
  }
});

//hash password before saving to the database
receptionistSchema.pre('save', async function (next) {
  //hash the password only if it's modified or new
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Receptionist', receptionistSchema);
