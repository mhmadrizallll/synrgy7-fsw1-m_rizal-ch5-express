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
  cdnUploadImagePeople,
} = require("../service/peopleService");

const upload = require("../middlewares/UploadHandler");
const cdnUpload = require("../middlewares/cdnUploadHandler");

router.get("/", getViews);
router.get("/people", isAdmin, getPeopleViews);

router.get("/", getPeople);
router.get("/search", getPeopleByName);
router.get("/:id", getPeopleById);
router.post("/", addPerson);
router.put("/:id", updatePerson);
router.delete("/:id", deletePerson);
router.post("/upload", upload.single("image"), uploadImagePeople);
router.post("/upload/cdn", cdnUpload.single("image"), cdnUploadImagePeople);

module.exports = router;
