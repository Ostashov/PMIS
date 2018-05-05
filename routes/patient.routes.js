var router = require("express").Router();
var patientsController = require("./../controllers/patients.controller");

// Creating of new patient via API
router.post("/patient/new", patientsController.createPatient);

router.post("/patients:lastname", patientsController.getPatientsByLastname);

module.exports = router;
