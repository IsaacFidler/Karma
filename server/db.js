const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/karma3', {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  if (err) return console.log(err)
  console.log('🐊🐊🐊🐊🐊connected to database🐊🐊🐊🐊🐊🐊')
})

module.exports = mongoose;