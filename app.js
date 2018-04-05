const express = require("express");
const bodyParser = require("body-parser");
const User = require("./models/user");
const Specialist = require("./models/specialist");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  User.find({})
    .then(users => {
      res.render("index", { users: users });
    })
    .catch(err => {
      res.status(200).json({ err: err });
    });
});
app.get("/register", (req, res) => res.render("register")); // res.send("Hello World! What\'s up!"))
app.post("/register", (req, res) => {
  const { login, password, firstname, lastname } = req.body;
  console.log(req.body);

  User.create({
    login: login,
    password: password
  }).then(user =>
    Specialist.create({
      firstname: firstname,
      lastname: lastname,
      userID: user.id
    })
  );

  res.redirect("/");
});

module.exports = app;
