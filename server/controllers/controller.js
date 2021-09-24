
const Job = require('../models/model')


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

// exports.createJob = async (req, res) => {

//   const job = new Job({
//     title: req.body.title,
//     location: req.body.location,
//     dates: req.body.dates,
//     duration: req.body.duration,
//     description: req.body.description,
//   })

//   const newJob = await job.save();

//   try
//   {
//     const newJob = await job.save();
//     res.status(201).json(newJob)
//   } catch (e)
//   {
//     res.status(400)
//   }
// }

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
