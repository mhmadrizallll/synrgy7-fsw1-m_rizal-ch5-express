const router = require("express").Router();
const peopleRouter = require("./peopleRouter");

router.use("/people", peopleRouter);

module.exports = router;
