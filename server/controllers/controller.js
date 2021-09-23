

///GET /topics - get All
//POST /topics - create one
//DELETE /topics/id - delete one


const Job = require('../models/model')

//Dont get supoer creative with these names.

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

exports.createJob = async (req, res) => {

  const job = new Job({
    title: req.body.title,
    location: req.body.location,
    dates: req.body.dates,
    duration: req.body.duration,
    description: req.body.description,
  })

  const newJob = await job.save();

  try
  {
    const newJob = await job.save();
    res.status(201).json(newJob)
  } catch (e)
  {
    res.status(400)
  }
}
