const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

const data = "Welcome!";

app.get("/", (req, res) => res.render("index", { data: data }));
app.get("/hello", (req, res) => res.render("hello")); // res.send("Hello World! What\'s up!"))
app.post("/hello", (req, res) => {
  console.log(req.body);
  res.render("hello");
});

module.exports = app;
