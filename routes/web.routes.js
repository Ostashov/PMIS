var router = require("express").Router();
var usersController = require("./../controllers/users.controller");

// TODO
// Browser client route here
router.get("/", function(req, res) {
  const id = req.session.userId;
  const login = req.session.userLogin;
  usersController.listUsers(req, res);
});

router.get("/register", (req, res) => {
  if (req.session.userId || req.session.userLogin) {
    res.redirect("/");
  } else {
    res.render("register");
  }
}); // res.send("Hello World! What\'s up!"))
router.post("/register", (req, res) => {
  if (req.session.userId || req.session.userLogin) {
    res.redirect("/");
  } else {
    usersController.createUser(req);
    res.redirect("/");
  }
});

router.get("/signin", (req, res) => res.render("signin"));
router.post("/signin", (req, res) => {
  res.render("signin");
  console.log(req.body);
});

// GET for logout
router.get("/logout", (req, res) => {
  if (req.session.userId || req.session.userLogin) {
    // delete session object
    console.log("session was destroyed");
    console.log(req.session);
    req.session.destroy(() => {
      res.redirect("/");
    });
  } else {
    console.log("LOGOUT: session does not exist");
    res.redirect("/");
  }
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
