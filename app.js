const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
// const User = require("./models/user");
// const Specialist = require("./models/specialist");
const pg = require("pg");
// const connectionString = process.env.DATABASE_URL || config.PG_URL;
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

app.get("/", (req, res) => {
  var pool = new pg.Pool(pg_connect);
  const results = [];
  // pg.connect(connectionString, (err, client, done) => {
  pool.connect(function(err, client, done) {
    // Handle connection errors
    if (err) {
      console.log(err);
      done();
      return res.status(500).json({ success: false, data: err });
    } else {
      // SQL Query > Select Data
      client.query("SELECT * FROM users", (err, res) => {
        console.log(err);
        // res.rows.forEach(function(item) {
        //   results.push(item);
        // });
      });
      // client.end();
      done();
    }
    console.log(results);
    res.render("index", { users: results });
  });
  pool.end();
});

// User.find({})
//   .then(users => {
//     res.render("index", { users: users });
//   })
//   .catch(err => {
//     res.status(200).json({ err: err });
//   });
// Specialist.aggregate([
//   {
//     $lookup: {
//       from: "User",
//       localfield: "_id",
//       foreignfield: "userID",
//       as: "doctor"
//     }
//   }
// ]);
// .exec(function(err, doctor) {
//   console.log(doctor);
//   console.log(err);
// });
// });

app.get("/register", (req, res) => res.render("register")); // res.send("Hello World! What\'s up!"))
app.post("/register", (req, res) => {
  const { login, password, firstname, lastname } = req.body;
  console.log(req.body);

  // User.create({
  //   login: login,
  //   password: password
  // }).then(user =>
  //   Specialist.create({
  //     firstname: firstname,
  //     lastname: lastname,
  //     userID: user.id
  //   })
  // );

  res.redirect("/");
});

module.exports = app;
