const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const CryptoJS = require("crypto-js");
const pg = require("pg");
const pg_connect = {
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port_pg
};

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// var pool = new pg.Pool(pg_connect);

app.get("/", (req, res) => {
  var pool = new pg.Pool(pg_connect);
  const results = [];
  pool.connect(function(err, client, done) {
    // Handle connection errors
    if (err) {
      console.log(err);
      done();
      return res.status(500).json({ success: false, data: err });
    } else {
      client
        .query("SELECT * FROM users")
        .then(result => {
          result.rows.forEach(function(item) {
            results.push(item);
          });
          console.log(results);
          res.render("index", { users: results });
        })
        .catch(err => console.log(err));

      done();
    }
  });
});

app.get("/register", (req, res) => res.render("register")); // res.send("Hello World! What\'s up!"))
app.post("/register", (req, res) => {
  const userInsert =
    "INSERT INTO users(email, password, register_dttm, usertype_id, deleted_flag) VALUES ($1, $2, $3, $4, $5);";
  const userValues = [
    req.body.email,
    CryptoJS.SHA256(req.body.password).toString(CryptoJS.enc.Base64),
    new Date().toLocaleString(),
    1,
    false
  ];
  // console.log(userValues);
  var pool = new pg.Pool(pg_connect);
  pool.connect(function(err, client, done) {
    // Handle connection errors
    if (err) {
      console.log(err);
      done();
      return res.status(500).json({ success: false, data: err });
    } else {
      client
        .query(userInsert, userValues)
        .then(result => {
          console.log(result.rows[0]);
        })
        .catch(err => console.log(err));
      done();
    }
  });

  res.redirect("/register");
});

app.get("/signin", (req, res) => res.render("signin"));

module.exports = app;
