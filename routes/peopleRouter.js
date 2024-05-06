const router = require("express").Router();
const {
  getPeople,
  getPeopleByName,
  getPeopleById,
  addPerson,
  updatePerson,
  deletePerson,
  isAdmin,
  getViews,
  getPeopleViews,
} = require("../service/peopleService");

router.get("/", getViews);
router.get("/people", getPeopleViews);

router.get("/", isAdmin, getPeople);
router.get("/search", getPeopleByName);
router.get("/:id", getPeopleById);
router.post("/", addPerson);
router.put("/:id", updatePerson);
router.delete("/:id", deletePerson);

module.exports = router;
