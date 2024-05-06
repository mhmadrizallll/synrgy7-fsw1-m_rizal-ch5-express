const fs = require("fs");

const idCheck = (req, res, next) => {
  const { id } = req.params;
  const newId = +id;
  if (newId > 0) next();

  res.status(400).send("Invalid ID");
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
module.exports = {
  getPeople,
  getPeopleByName,
  getPeopleById,
  addPerson,
  updatePerson,
  deletePerson,
  idCheck,
};
