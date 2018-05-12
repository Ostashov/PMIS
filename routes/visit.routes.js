var router = require("express").Router();
var visitsController = require("./../controllers/visits.controller");

// Creating of new patient via API
router.post("/visit/new", visitsController.create);

router.post(
  "/visits:specialistId/getTen",
  visitsController.getTenBySpecialistId
);

router.post("/visits:visitId/finish", visitsController.finish);
router.post("/visits:visitId/delete", visitsController.delete);
router.post("/visits:visitId/report", visitsController.getVisitData);

module.exports = router;
