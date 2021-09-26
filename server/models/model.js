const mongoose = require('../db')

const Schema = mongoose.Schema;

const jobSchema = new Schema({
  title: String,
  'location': String,
  'startDate': String,
  'endDate': String,
  'duration': String,
  'description': String,
  'productImage': {type: String, required: true},
  'tags': Array
})

const Jobs = mongoose.model('jobs', jobSchema);
module.exports = Jobs;