const mongoose = require('mongoose')
//got back to karma5 for it to work

//next new db = karma11
mongoose.connect('mongodb://localhost/karma1o', {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  if (err) return console.log(err)
  console.log('🐊🐊🐊🐊🐊connected to database🐊🐊🐊🐊🐊🐊')
})

module.exports = mongoose;