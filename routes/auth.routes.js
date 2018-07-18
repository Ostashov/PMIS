var router = require("express").Router();
var User = require("./../models/user");
var usersController = require("./../controllers/users.controller");

// Registration of new users via API
router.post("/auth/register", usersController.createUser);

router.post("/auth/authenticate", function(req, res) {
  User.authenticate(req.body)
    .then(function(result) {
      if (result.isAuthorized === true) {
        console.log("=== isAuthorized");
        req.body.id = result.id;
        console.log(req.body);
        req.session.userId = req.body.id;
        req.session.userLogin = req.body.email;
        console.log("== req.session");
        console.log(req.session);
        res.redirect("../../");
      } else {
        console.log("bad credentials");
        return res.status(401).json({
          message: "bad credentials"
        });
      }
    })
    .catch(function(err) {
      return res.status(400).json({
        message: err
      });
    });
});

module.exports = router;
