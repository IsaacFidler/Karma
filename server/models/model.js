const mongoose = require('../db')

const Schema = mongoose.Schema;

const jobSchema = new Schema({

  img:
    {data: Buffer, contentType: String}
  ,
  'title': String,
  'location': String,
  'dates': String,
  'duration': String,
  'description': String,

})

const Jobs = mongoose.model('jobs', jobSchema);
module.exports = Jobs;