//Iuliia Chugunova
//Schema of patient. Defines data structure, allows connections to database and CRUD operations 

const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    description: 'Name of the patient'
  },
  email: {
    type: String,
    required: true,
    match: /^\S+@\S+\.\S+$/,
    description: 'Email address of the patient'
  },
  phone: {
    type: String,
    required: true,
    match: /^\+?\d{1,3}-?\d{3}-?\d{3}-?\d{4}$/,
    description: 'Phone number of the patient'
  },
  address: {
    type: String,
    description: 'Address of the patient'
  },
  password: {
    type: String,
    required: true,
    description: 'Password of the patient'
  },
  documents: [{
    type: {
      type: String,
      required: true,
      description: 'Type of document (e.g., medical report, prescription)'
    },
    filename: {
      type: String,
      required: true,
      description: 'Name of the uploaded file'
    },
    uploadedAt: {
      type: Date,
      required: true,
      description: 'Date and time when the document was uploaded'
    },
    description: {
      type: String,
      description: 'Optional description or comments about the document'
    }
  }],
  medicalHistory: [{
    condition: {
      type: String,
      required: true,
      description: 'Medical condition of the patient'
    },
    diagnosis: {
      type: String,
      required: true,
      description: 'Diagnosis related to the medical condition'
    }
  }]
});

//hash password before saving to the database
patientSchema.pre('save', async function (next) {
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

module.exports = mongoose.model('Patient', patientSchema);
