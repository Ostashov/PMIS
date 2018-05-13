var Promise = require("promise");
var config = require("./../config/config");
var Patient = require("./../models/patient");

module.exports = {
  createPatient: function(req, res) {
    Patient.create(req.body)
      .then(function(result) {
        // res.redirect("./visit");
        return res.status(200).json({
          message: "success! created the new patient",
          id: result.id
        });
      })
      .catch(function(err) {
        return res.status(400).json({
          message: err
        });
      });
  },

  changeFirstname: function(req, res) {
    Patient.updateFirstname({ id: req.params.id, name: req.body.name })
      .then(function(result) {
        return res.status(200).json(result);
      })
      .catch(function(err) {
        return res.status(400).json({
          message: err
        });
      });
  },

  changeLastname: function(req, res) {
    Patient.updateLastname({ id: req.params.id, name: req.body.name })
      .then(function(result) {
        return res.status(200).json(result);
      })
      .catch(function(err) {
        return res.status(400).json({
          message: err
        });
      });
  },

  deletePatient: function(req, res) {
    Patient.delete({ id: req.params.id })
      .then(function(result) {
        return res.status(200).json({
          message: "deleted patient with id: " + result.id
        });
      })
      .catch(function(err) {
        return res.status(400).json({
          message: err
        });
      });
  },

  getOnePatient: function(req, res) {
    Patient.findOne({ id: req.params.id })
      .then(function(result) {
        return res.status(200).json(result);
      })
      .catch(function(err) {
        return res.status(400).json({
          message: err
        });
      });
  },

  getPatientById: function(req) {
    return new Promise(function(resolve, reject) {
      Patient.findOne({ id: req })
        .then(function(result) {
          resolve(result);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  },

  getPatientsByLastname: function(req, res) {
    Patient.findAllByLastname({ lastname: req.params.lastname })
      .then(function(result) {
        return res.status(200).json(result);
      })
      .catch(function(err) {
        return res.status(400).json({
          message: err
        });
      });
  },

  getAllPatientsBySpecialist: function(req, res) {
    Patient.findAllBySpecialist({ id: req.params.specialistId })
      .then(function(result) {
        return res.status(200).json(result);
      })
      .catch(function(err) {
        return res.status(400).json({
          message: err
        });
      });
  },

  listPatients: function() {
    return new Promise(function(resolve, reject) {
      Patient.findAll()
        .then(function(result) {
          resolve(result);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }
};
