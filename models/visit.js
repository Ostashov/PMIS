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

  getSpecialist: function(data) {
    return new Promise(function(resolve, reject) {
      if (!data.id) {
        reject("error: must provide id");
      } else {
        db
          .query(
            "SELECT * FROM users WHERE deleted_flag = false AND id IN (SELECT specialist_id FROM visits WHERE id = $1 AND deleted_flag = false)",
            [data.id]
          )
          .then(function(results) {
            var specialist = results.rows[0];
            delete specialist.password;
            delete specialist.deleted_flag;
            delete specialist.last_login_attempt;
            delete specialist.login_attempts;
            resolve(specialist);
          })
          .catch(function(err) {
            console.log(err);
            reject(err);
          });
      }
    });
  },

  create: function(data) {
    return new Promise(function(resolve, reject) {
      db
        .query(
          "INSERT INTO visits (specialist_id, patient_id, start_dttm, end_dttm, deleted_flag, isFirst) VALUES ($1, $2, $3, $4, $5, $6) returning id",
          [
            data.specialistId,
            data.patientId,
            data.start_dttm,
            data.end_dttm,
            false,
            data.isFirst
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
  },

  findAllBySpecialistId: function(id, number) {
    return new Promise(function(resolve, reject) {
      db
        .query(
          "select visits.id, visits.specialist_id, visits.patient_id, patients.lastname, patients.firstname, patients.middlename, visits.start_dttm, visits.end_dttm, visits.isfirst from visits inner join patients ON visits.patient_id = patients.id AND patients.deleted_flag = false inner join users ON visits.specialist_id = users.id AND users.deleted_flag = false WHERE visits.specialist_id = $1 AND visits.deleted_flag = false ORDER BY visits.id DESC LIMIT $2",
          [id, number || "ALL"]
        )
        .then(function(results) {
          resolve(results.rows);
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
          var visit = result.rows[0];
          delete visit.deleted_flag;
          resolve(visit);
        } else {
          reject("no visit found");
        }
      })
      .catch(function(err) {
        reject(err);
      });
  });
}