const router = require("express").Router();
const peopleRouter = require("./peopleRouter");

router.use("/people", peopleRouter);
router.use("/views", peopleRouter);

module.exports = router;
