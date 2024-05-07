const fs = require("fs");
// const cloudinary = require("cloudinary").v2;
const cloudinary = require("../middlewares/cloudinary");
const isAdmin = (req, res, next) => {
  if (req.query.isAdmin === "admin") {
    next();
  } else {
    res.status(401).send("Forbidden");
  }
};

const getPeople = (req, res) => {
  fs.readFile("people.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.send(data);
  });
};

const getPeopleByName = (req, res) => {
  fs.readFile("people.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    const people = JSON.parse(data);
    const name = req.query.name;
    const person = people.filter((p) => p.name === name);
    res.send(person);
  });
};

const getPeopleById = (req, res) => {
  fs.readFile("people.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    const people = JSON.parse(data);
    const person = people.find((p) => p.id == req.params.id);
    res.send(person);
  });
};

const uploadImagePeople = (req, res) => {
  const url = `/uploads/${req.file.filename}`;

  res.status(200).json({ message: "uploaded", url });
};
const addPerson = (req, res) => {
  fs.readFile("people.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    const people = JSON.parse(data);
    const newPerson = {
      id: people.length + 1,
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
    };
    people.push(newPerson);
    fs.writeFile("people.json", JSON.stringify(people, null, 2), (err) => {
      if (err) {
        console.log(err);
      }
      res.send(newPerson);
    });
  });
};

const updatePerson = (req, res) => {
  fs.readFile("people.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    const people = JSON.parse(data);
    const person = people.find((p) => p.id == req.params.id);
    person.name = req.body.name;
    person.username = req.body.username;
    person.email = req.body.email;
    fs.writeFile("people.json", JSON.stringify(people, null, 2), (err) => {
      if (err) {
        console.log(err);
      }
      res.send(person);
    });
  });
};

const deletePerson = (req, res) => {
  fs.readFile("people.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    const people = JSON.parse(data);
    const person = people.find((p) => p.id == req.params.id);
    const index = people.indexOf(person);
    people.splice(index, 1);
    fs.writeFile("people.json", JSON.stringify(people, null, 2), (err) => {
      if (err) {
        console.log(err);
      }
      res.send(person);
    });
  });
};

const getViews = (req, res) => {
  res.render("../public/views/index");
};
const getPeopleViews = (req, res) => {
  fs.readFile("people.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    const people = JSON.parse(data);
    res.render("../public/views/people", { people });
  });
};

const cdnUploadImagePeople = (req, res) => {
  const fileBase64 = req.file.buffer.toString("base64");
  const file = `data:${req.file.mimetype};base64,${fileBase64}`;

  cloudinary.uploader.upload(file, (err, result) => {
    res.status(200).json({ message: "uploaded", url: result.url });
  });
};

module.exports = {
  uploadImagePeople,
  getViews,
  getPeopleViews,
  getPeople,
  getPeopleByName,
  getPeopleById,
  addPerson,
  updatePerson,
  deletePerson,
  isAdmin,
  cdnUploadImagePeople,
};
