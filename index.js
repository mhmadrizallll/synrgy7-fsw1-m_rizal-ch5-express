const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/people", (req, res) => {
  fs.readFile("people.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.send(data);
  });
});

app.get("/people/search", (req, res) => {
  fs.readFile("people.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    const people = JSON.parse(data);
    const name = req.query.name;
    const person = people.filter((p) => p.name === name);
    res.send(person);
  });
});

app.get("/people/:id", (req, res) => {
  fs.readFile("people.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    const people = JSON.parse(data);
    const person = people.find((p) => p.id == req.params.id);
    res.send(person);
  });
});

app.post("/people", (req, res) => {
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
});

app.put("/people/:id", (req, res) => {
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
});

app.delete("/people/:id", (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
