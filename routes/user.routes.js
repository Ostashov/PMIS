var router = require("express").Router();
var usersController = require("./../controllers/users.controller");

router.post("/users/getSelf", usersController.getSelfUser);

module.exports = router;
