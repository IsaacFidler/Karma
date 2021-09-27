const mongoose = require('../db')

const Schema = mongoose.Schema;

const userSchema = new Schema({
  'username': String,
  'password': String,
  'location': String,
  'aboutMe': String,
  'userImage': {type: String, required: true}
})



const Users = mongoose.model('users', userSchema);
module.exports = Users;