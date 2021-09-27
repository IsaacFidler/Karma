const express = require('express')
const router = express.Router();
const controller = require('../controllers/controller');
const multer = require('multer')
const Job = require('../models/model')
const User = require('../models/userModel')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const upload = multer({
  storage: storage, limits: {
    // fileSize: 1024 * 1024 * 5
  }
})

router
  .get('/', controller.getAllJobs)
  .get('/user', controller.getAllUsers)
  .get('/:Id', controller.getDetailJob)
  .get('/user/:Id', controller.getDetailUser)
  .post('/user', upload.single('userImage'), (req, res, next) => {
    console.log(req.body)
    const product = new User({
      username: req.body.username,
      password: req.body.password,
      location: req.body.location,
      aboutMe: req.body.aboutMe,
      userImage: req.file.path,
    });
    product
      .save()
      .then(result => {

        res.status(201).json({
          message: "Created product successfully",
          createdProduct: {
            username: result.username,
            password: result.password,
            location: result.location,
            aboutMe: result.aboutMe,
            userImage: result.userImage,
            request: {
              type: 'GET',
              url: "http://localhost:3004/jobs/"
            }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  })
  .post('/', upload.single('productImage'), (req, res, next) => {
    console.log(req.body)
    const product = new Job({
      title: req.body.title,
      location: req.body.location,
      startDate: req.body.location,
      endDate: req.body.endDate,
      location: req.body.location,
      duration: req.body.duration,
      description: req.body.description,
      productImage: req.file.path,
      tags: req.body.tags
    });
    product
      .save()
      .then(result => {

        res.status(201).json({
          message: "Created product successfully",
          createdProduct: {
            title: result.title,
            location: result.location,
            startDate: result.startDate,
            endDate: result.endDate,
            duration: result.duration,
            description: result.description,
            productImage: result.productImage,
            request: {
              type: 'GET',
              url: "http://localhost:3004/jobs/"
            }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });


module.exports = router;