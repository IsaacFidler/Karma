const express = require('express');
const app = express();
const PORT = 3005;
const cors = require('cors')
const jobsRouter = require('./routes/jobs')
const mutler = require('multer')

const storage = mutler.diskStorage({
  destination: function (request, file, callback) {
    callback(null, './public/uplaods/images')
  }
})

const upload = mutler({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  }
})

app.use(cors())
app.use(express.json())
app.use('/jobs', jobsRouter)

app.listen(PORT, () => (
  console.log(`🏄‍♂️ 🏄‍♂️ 🏄‍♂️ 🏄‍♂️ 🏄‍♂️ server started on https://localhost:${PORT} 🤙 🤙 🤙 🤙 🤙 🤙 🤙 🤙 `)
));