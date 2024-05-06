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
  uploadImagePeople,
} = require("../service/peopleService");

const upload = require("../middlewares/UploadHandler");

router.get("/", getViews);
router.get("/people", getPeopleViews);

router.get("/", isAdmin, getPeople);
router.get("/search", getPeopleByName);
router.get("/:id", getPeopleById);
router.post("/", addPerson);
router.put("/:id", updatePerson);
router.delete("/:id", deletePerson);
router.post("/upload", upload.single("image"), uploadImagePeople);

module.exports = router;
