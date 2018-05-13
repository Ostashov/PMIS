var Promise = require("promise");
var config = require("./../config/config");
var db = require("./../config/database");
// const CryptoJS = require("crypto-js");

module.exports = {
  findAll: function() {
    return new Promise(function(resolve, reject) {
      db
        .query(
          "SELECT * FROM patients WHERE deleted_flag = false ORDER BY lastname, firstname, middlename",
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

  findAllByLastname: function(data) {
    return new Promise(function(resolve, reject) {
      db
        .query(
          "SELECT * FROM patients WHERE lower(lastname) LIKE $1 AND deleted_flag = false ORDER BY lastname, firstname, middlename ",
          [data.lastname.toLowerCase().substring(1) + "%"]
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

  findAllBySpecialist: function(data) {
    return new Promise(function(resolve, reject) {
      db
        .query(
          "SELECT DISTINCT p.id, p.lastname, p.firstname, p.middlename, p.birthdate FROM patients p INNER JOIN visits v ON p.id = v.patient_id WHERE v.specialist_id=$1 AND p.deleted_flag=false ORDER BY p.lastname",
          [data.id.toLowerCase().substring(1)]
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

  getVisitsByPatientId: function(data) {
    return new Promise(function(resolve, reject) {
      db
        .query(
          "SELECT v.id, u.id AS specialist_id, p.lastname AS patient_lastname, p.firstname AS patient_firstname, v.start_dttm, v.end_dttm, u.lastname AS specialist_lastname, u.firstname AS specialist_firstname " +
            "FROM visits v " +
            "INNER JOIN users u " +
            "ON v.specialist_id = u.id " +
            "INNER JOIN patients p " +
            "ON p.id = v.patient_id " +
            "WHERE v.patient_id=$1 " +
            "AND v.deleted_flag=false " +
            "ORDER BY v.start_dttm DESC",
          [data.id.toLowerCase().substring(1)]
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
          "INSERT INTO patients (firstname, lastname, middlename, birthdate, deleted_flag) VALUES ($1, $2, $3, $4, $5) returning id",
          [
            data.firstname,
            data.lastname,
            data.middlename || null,
            data.birthdate,
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
          "UPDATE patients SET deleted_flag = true WHERE id = $1 returning id",
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

  updateFirstname: function(data) {
    return new Promise(function(resolve, reject) {
      if (!data.id) {
        reject("error: id missing");
      } else {
        db
          .query(
            "UPDATE patients SET firstname = $2 WHERE id = $1 returning firstname",
            [data.id, data.firstname]
          )
          .then(function(result) {
            resolve(result.rows[0]);
          })
          .catch(function(err) {
            reject(err);
          });
      }
    });
  },

  updateLastname: function(data) {
    return new Promise(function(resolve, reject) {
      if (!data.id) {
        reject("error: id missing");
      } else {
        db
          .query(
            "UPDATE patients SET lastname = $2 WHERE id = $1 returning lastname",
            [data.id, data.lastname]
          )
          .then(function(result) {
            resolve(result.rows[0]);
          })
          .catch(function(err) {
            reject(err);
          });
      }
    });
  },

  updateMiddlename: function(data) {
    return new Promise(function(resolve, reject) {
      if (!data.id) {
        reject("error: id missing");
      } else {
        db
          .query(
            "UPDATE patients SET middlename = $2 WHERE id = $1 returning middlename",
            [data.id, data.middlename]
          )
          .then(function(result) {
            resolve(result.rows[0]);
          })
          .catch(function(err) {
            reject(err);
          });
      }
    });
  },

  updateBirthdate: function(data) {
    return new Promise(function(resolve, reject) {
      if (!data.id) {
        reject("error: id missing");
      } else {
        db
          .query(
            "UPDATE patients SET birthdate = $2 WHERE id = $1 returning birthdate",
            [data.id, data.birthdate]
          )
          .then(function(result) {
            resolve(result.rows[0]);
          })
          .catch(function(err) {
            reject(err);
          });
      }
    });
  }
};

function findOneById(id) {
  return new Promise(function(resolve, reject) {
    db
      .query("SELECT * FROM patients WHERE id = $1 AND deleted_flag = false", [
        id
      ])
      .then(function(result) {
        if (result.rows[0]) {
          resolve(result.rows[0]);
        } else {
          reject("no patient found");
        }
      })
      .catch(function(err) {
        reject(err);
      });
  });
}
