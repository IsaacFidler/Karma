const express = require('express');
const app = express();
const PORT = 3005;
const cors = require('cors')
const jobsRouter = require('./routes/jobs')
const multer = require('multer')

app.use('/uploads', express.static('uploads'))
app.use(cors())
app.use(express.json())
app.use('/jobs', jobsRouter)

app.listen(PORT, () => (
  console.log(`🏄‍♂️ 🏄‍♂️ 🏄‍♂️ 🏄‍♂️ 🏄‍♂️ server started on https://localhost:${PORT} 🤙 🤙 🤙 🤙 🤙 🤙 🤙 🤙 `)
));