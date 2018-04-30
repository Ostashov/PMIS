var router = require("express").Router();
var usersController = require("./../controllers/users.controller");

// TODO
// Browser client route here
router.get("/", function(req, res) {
  var users = usersController.listUsers(req, res);
  // res.render("index", { users: users });
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
