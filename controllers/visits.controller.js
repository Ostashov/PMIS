var Promise = require("promise");
var config = require("./../config/config");
var Visit = require("./../models/visit");

module.exports = {
  create: function(req, res) {
    Visit.create(req.body)
      .then(function(result) {
        return res.status(200).json({
          message: "success! created the new visit",
          id: result.id
        });
      })
      .catch(function(err) {
        console.log(err);
        return res.status(400).json({
          message: err
        });
      });
  },

  deleteVisit: function(req, res) {
    Visit.delete({ id: req.params.id })
      .then(function(result) {
        return res.status(200).json({
          message: "deleted visit with id: " + result.id
        });
      })
      .catch(function(err) {
        return res.status(400).json({
          message: err
        });
      });
  },

  getVisitById: function(req, res) {
    Visit.findOne({ id: req })
      .then(function(result) {
        return res.status(200).json(result);
      })
      .catch(function(err) {
        return res.status(400).json({
          message: err
        });
      });
  },

  getSpecialistByVisitId: function(req, res) {
    Visit.getSpecialist({ id: req })
      .then(function(result) {
        return res.status(200).json(result);
      })
      .catch(function(err) {
        console.log(err);
        return res.status(400).json({
          message: err
        });
      });
  },

  listVisits: function() {
    return new Promise(function(resolve, reject) {
      Visit.findAll()
        .then(function(result) {
          resolve(result);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }
};
