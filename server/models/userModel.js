const mongoose = require('../db')

const Schema = mongoose.Schema;

const userSchema = new Schema({
  'username': String,
  'password': String,
  'location': String,
  'endDate': String,
  'duration': String,
  'AboutMe': String,
  'profilePicture': {type: String, required: true}

})



const Users = mongoose.model('users', userSchema);
module.exports = Users;