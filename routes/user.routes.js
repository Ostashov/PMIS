var router = require("express").Router();
var usersController = require("./../controllers/users.controller");

// Creating of new patient via API
router.post("/users/getSelf", usersController.getSelfUser);

module.exports = router;
