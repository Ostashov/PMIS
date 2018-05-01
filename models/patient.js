var Promise = require("promise");
var config = require("./../config/config");
var db = require("./../config/database");
// const CryptoJS = require("crypto-js");

module.exports = {
  findAll: function() {
    return new Promise(function(resolve, reject) {
      db
        .query(
          "SELECT * FROM patients ORDER BY lastname, firstname, middlename",
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
      db.query(
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
  },

  delete: function(data) {
    return new Promise(function(resolve, reject) {
      db
        .query("DELETE FROM patients WHERE id = $1 returning id", [data.id])
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
            "UPDATE patients SET firstname = $2 WHERE id = $1 returning name",
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
            "UPDATE patients SET lastname = $2 WHERE id = $1 returning name",
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
            "UPDATE patients SET middlename = $2 WHERE id = $1 returning name",
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
            "UPDATE patients SET birthdate = $2 WHERE id = $1 returning name",
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
      .query("SELECT * FROM patients WHERE id = $1", [id])
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
