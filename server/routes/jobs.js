const express = require('express')
const router = express.Router();
const controller = require('../controllers/controller');

router
  .get('/', controller.getAllJobs)
  .post('/', controller.createJob)

module.exports = router;