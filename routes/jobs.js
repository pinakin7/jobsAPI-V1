const express = require('express');
const { getAllJobs, createJob, getJob, updateJob, deleteJob } = require('../controllers/jobs');

const jobsRouter = express.Router();

jobsRouter.route('/').post(createJob).get(getAllJobs);
jobsRouter.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);

module.exports = jobsRouter;