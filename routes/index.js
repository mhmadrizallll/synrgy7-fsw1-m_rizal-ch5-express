const router = require("express").Router();
const peopleRouter = require("./peopleRouter");
const jobRouter = require("./jobRouter");

router.use("/people", peopleRouter);
router.use("/views", peopleRouter);
router.use("/jobs", jobRouter);

module.exports = router;
