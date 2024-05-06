const router = require("express").Router();
const {
  getPeople,
  getPeopleByName,
  getPeopleById,
  addPerson,
  updatePerson,
  deletePerson,
  idCheck,
} = require("../service/peopleService");

router.get("/", getPeople);
router.get("/search", idCheck, getPeopleByName);
router.get("/:id", getPeopleById);
router.post("/", addPerson);
router.put("/:id", updatePerson);
router.delete("/:id", deletePerson);

module.exports = router;
