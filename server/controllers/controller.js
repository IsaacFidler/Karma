
const Job = require('../models/model')
const User = require('../models/userModel')


exports.getAllJobs = async (req, res) => {
  try
  {
    const jobs = await Job.find()
    res.json(jobs)
    res.status(200);
  } catch (e)
  {
    console.error(e)
    res.status(500);
  }
}

exports.getAllUsers = async (req, res) => {
  try
  {
    const users = await User.find()
    res.json(users)
    res.status(200);
  } catch (e)
  {
    console.error(e)
    res.status(500);
  }
}

exports.getDetailJob = async (req, res) => {

  let userId = req.params.Id;
  try
  {
    const jobs = await Job.find({"_id": userId})
    res.json(jobs)
    res.status(200);
  } catch (e)
  {
    console.error(e)
    res.status(500);
  }
}
exports.getDetailUser = async (req, res) => {

  let userId = req.params.username
  try
  {
    const users = await User.find({"username": userId})
    console.log(users)
    res.json(users)
    res.status(200);
  } catch (e)
  {
    console.error(e)
    res.status(500);
  }
}

exports.appliedforJobs = async (req, res) => {
  let user = req.params.username
  console.log()
  try
  {
    const users = await User.find({"username": user})
    // const theUser = users.pop()
    // console.log(req.body)
    // console.log(theUser.jobsApplied)
    users[0].jobsApplied = users[0].jobsApplied + ', ' + req.body.job
    // users[0].jobsApplied = ''
    users[0].save();
    res.send({data: users})
    // console.log(theUser.jobsApplied)
    res.json(users)
    res.status(200);
  } catch (e)
  {
    console.error(e)
    res.status(500);
  }

}

exports.createJob2 = async (req, res) => {
  console.log(req.file)
  const product = new Job({
    title: req.body.title,
    location: req.body.location,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    location: req.body.location,
    duration: req.body.duration,
    description: req.body.description,
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
          title: result.title,
          location: result.location,
          startDate: result.startDate,
          endDate: result.endDate,
          duration: result.duration,
          description: result.description,
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
};
