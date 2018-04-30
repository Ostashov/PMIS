var router = require("express").Router();
var usersController = require("./../controllers/users.controller");

// TODO
// Browser client route here
router.get("/", function(req, res) {
  usersController.listUsers(req, res);
});

router.get("/register", (req, res) => res.render("register")); // res.send("Hello World! What\'s up!"))
router.post("/register", (req, res) => {
  usersController.createUser(req);
  res.redirect("/");
});

router.get("/signin", (req, res) => res.render("signin"));
router.post("/signin", (req, res) => {
  res.render("signin");
  console.log(req.body);
});

// Browser error routes
router.use(function(req, res) {
  res.status(404);
  return res.render("error", {
    title: "Something went wrong",
    error: 404,
    message: "We don't know what happened, but we're working on it :)"
  });
});

module.exports = router;
