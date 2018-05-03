var router = require("express").Router();
var patientsController = require("./../controllers/patients.controller");

// Creating of new patient via API
router.post("/patient/new", patientsController.createPatient);

router.get("/patient/new", (req, res) => {
  res.redirect("./");
});

module.exports = router;
