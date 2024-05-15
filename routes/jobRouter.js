const express = require("express");
const { getJobs, getJobsPost, getJobsAlbum } = require("../service/jobService");
const router = express.Router();

router.get("/", getJobs);
router.get("/posts", getJobsPost);
router.get("/album", getJobsAlbum);

module.exports = router;
