var Promise = require("promise");
var config = require("./../config/config");
var db = require("./../config/database");

module.exports = {
  findAll: function() {
    return new Promise(function(resolve, reject) {
      db
        .query(
          "SELECT * FROM visits WHERE deleted_flag = false ORDER BY id",
          []
        )
        .then(function(results) {
          resolve(results.rows);
        })
        .catch(function(err) {
          console.log(err);
          reject(err);
        });
    });
  },

  findOne: function(data) {
    return new Promise(function(resolve, reject) {
      if (!data.id) {
        reject("error: must provide id");
      } else {
        findOneById(data.id)
          .then(function(result) {
            resolve(result);
          })
          .catch(function(err) {
            reject(err);
          });
      }
    });
  },

  create: function(data) {
    return new Promise(function(resolve, reject) {
      db
        .query(
          "INSERT INTO visits (specialist_id, patient_id, start_dttm, end_dtt, deleted_flag) VALUES ($1, $2, $3, $4, $5) returning id",
          [
            data.specialistId,
            data.patientId,
            data.start_dttm,
            data.end_dttm,
            false
          ]
        )
        .then(function(result) {
          resolve(result.rows[0]);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  },

  delete: function(data) {
    return new Promise(function(resolve, reject) {
      db
        .query(
          "UPDATE visits SET deleted_flag = true WHERE id = $1 returning id",
          [data.id]
        )
        .then(function(result) {
          resolve(result.rows[0]);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }
};

function findOneById(id) {
  return new Promise(function(resolve, reject) {
    db
      .query("SELECT * FROM visits WHERE id = $1 AND deleted_flag = false", [
        id
      ])
      .then(function(result) {
        if (result.rows[0]) {
          resolve(result.rows[0]);
        } else {
          reject("no visit found");
        }
      })
      .catch(function(err) {
        reject(err);
      });
  });
}
