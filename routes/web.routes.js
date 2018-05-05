var router = require("express").Router();
var usersController = require("./../controllers/users.controller");
var documentsController = require("./../controllers/documents.controller");
var patientsController = require("./../controllers/patients.controller");
var visitsController = require("./../controllers/visits.controller");

// TODO
// Browser client route here
router.get("/", function(req, res) {
  usersController.listUsers(req, res).then(function(listOfUsers) {
    res.render("index", {
      users: listOfUsers,
      user: {
        id: req.session.userId,
        email: req.session.userLogin
      }
    });
  });
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

router.get("/signin", (req, res) => {
  if (req.session.userId || req.session.userLogin) {
    res.redirect("/");
  } else {
    res.render("signin");
  }
});
router.post("/signin", (req, res) => {
  res.render("signin");
  // console.log(req.body);
});

router.get("/visit", (req, res) => {
  if (!(req.session.userId || req.session.userLogin)) {
    res.redirect("/");
  } else {
    var renderData = {};
    usersController
      .getUserById(req.session.userId)
      .then(function(result) {
        // console.log(result);
        renderData.user = result;
        // res.render("visit", { user: result });
      })
      .catch(function(err) {
        console.log(err);
      })
      .done(function() {
        documentsController
          .listOfTypes()
          .then(function(result) {
            renderData.listOfDocumentTypes = result;
          })
          .catch(function(err) {
            console.log(err);
          })
          .done(function() {
            patientsController
              .listPatients()
              .then(function(result) {
                renderData.listOfPatients = result;
              })
              .catch(function(err) {
                console.log("List of patients", err);
              })
              .done(function() {
                // console.log(renderData);
                res.render("visit", renderData);
              });
          });
      });
  }
});

router.post("/visit", (req, res) => {
  if (!(req.session.userId || req.session.userLogin)) {
    res.redirect("/");
  } else {
    res.render("visit");
  }
});

router.get("/visit:visitId", (req, res) => {
  var specialist = {};
  var visitId = req.params.visitId.substring(1);
  if (!(req.session.userId || req.session.userLogin)) {
    res.redirect("/");
  } else {
    // specialist = visitsController.getSpecialistByVisitId(visitId);
  }
  if (specialist) {
    if ((specialist.id = req.session.userId)) {
      console.log(JSON.stringify(specialist));
      res.render("particularVisit", {
        visit: {
          id: visitId
        },
        user: {
          id: req.session.userId,
          email: req.session.userLogin
        }
      });
    } else {
      res.render("particularVisit", {
        user: {
          id: req.session.userId,
          email: req.session.userLogin
        }
      });
    }
  }
});

// GET for logout
router.get("/logout", (req, res) => {
  if (req.session.userId || req.session.userLogin) {
    // delete session object
    console.log("session was destroyed");
    // console.log(req.session);
    req.session.destroy(() => {
      res.redirect("/");
    });
  } else {
    // console.log("LOGOUT: session does not exist");
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
