var router = require("express").Router();
var visitsController = require("./../controllers/visits.controller");

// Creating of new patient via API
router.post("/visit/new", visitsController.create);

router.post(
  "/visits:specialistId/getTen",
  visitsController.getTenBySpecialistId
);

router.post("/visits:visitId/finish", visitsController.finish);

module.exports = router;
