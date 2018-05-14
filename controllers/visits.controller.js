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

  delete: function(req, res) {
    Visit.delete(req.body)
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
    return new Promise(function(resolve, reject) {
      Visit.findOne({ id: req })
        .then(function(result) {
          resolve(result);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  },

  getSpecialistByVisitId: function(req, res) {
    return new Promise(function(resolve, reject) {
      Visit.getSpecialist({ id: req })
        .then(function(result) {
          resolve(result);
        })
        .catch(function(err) {
          console.log(err);
          reject(err);
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
  },

  getTenBySpecialistId: function(req, res) {
    var specialist_id = req.params.specialistId.substring(1);

    Visit.findAllBySpecialistId(specialist_id, 10)
      .then(function(results) {
        return res.status(200).json(results);
      })
      .catch(function(err) {
        return res.status(400).json({
          message: err
        });
      });
  },

  finish: function(req, res) {
    Visit.finish(req.body)
      .then(function(result) {
        return res.status(200).json({
          message: "success! finished the visit",
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

  getVisitData: function(req, res) {
    var visit_id = req.params.visitId.substring(1);
    Visit.getData(visit_id)
      .then(function(results) {
        return res.status(200).json(results);
      })
      .catch(function(err) {
        return res.status(400).json({
          message: err
        });
      });
  },

  downloadReport: function(req, res) {
    var visit_id = req.params.visitId.substring(1);
    // console.log(visit_id);
    var csv = "",
      data = [["a", "b", "c"], ["d", "e", "f"]];

    Visit.getReport(visit_id)
      .then(function(results) {
        return res.status(200).json(results);
      })
      .catch(function(err) {
        console.log(err);
        return res.status(400).json({
          message: err
        });
      });

    // res.statusCode = 200;
    // res.setHeader("Content-Type", "text/csv; charset=Shift_JIS");

    // data.forEach(function(item) {
    //   item.forEach(function(field) {
    //     // console.log(field);
    //     csv += field.toString().replace(/\"/g, '""') + ";";
    //   });
    //   csv += "\r\n";
    // });
    // console.log(csv);
    // res.write(csv);
    // res.end();

    // return res.csv([{ name: "joe", id: 1 }]);
  }
};
