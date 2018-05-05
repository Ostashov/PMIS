var router = require("express").Router();

// Authentication routes
router.use(require("./auth.routes"));

// User routes
router.use(require("./user.routes"));

// Patient routes
router.use(require("./patient.routes"));

// API v1
router.use("/v1", require("./apiv1/users.routes"));

// API Error routes
router.use(function(req, res) {
  return res.status(404).json({
    message: "Not found."
  });
});

module.exports = router;
