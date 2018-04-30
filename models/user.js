var Promise = require("promise");
// var config = require("./../config/config");
var db = require("./../config/database");
const CryptoJS = require("crypto-js");

module.exports = {
  findAll: function() {
    return new Promise(function(resolve, reject) {
      db
        .query("SELECT id, email, firstname, lastname FROM users", [])
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
      if (!data.id && !data.email) {
        reject("error: must provide id or email");
      } else {
        if (data.id) {
          findOneById(data.id)
            .then(function(result) {
              delete result.password;
              resolve(result);
            })
            .catch(function(err) {
              reject(err);
            });
        } else if (data.email) {
          findOneByEmail(data.email)
            .then(function(result) {
              delete result.password;
              resolve(result);
            })
            .catch(function(err) {
              reject(err);
            });
        }
      }
    });
  },

  create: function(data) {
    var usertype_id_default = 1;
    // console.log(data);
    return new Promise(function(resolve, reject) {
      validateUserData(data)
        .then(function() {
          return hashPassword(data.password);
        })
        .then(function(hash) {
          return db.query(
            "INSERT INTO users (email, firstname, lastname, password, register_dttm, usertype_id, deleted_flag) VALUES ($1, $2, $3, $4, $5, $6, $7) returning id",
            [
              data.email,
              data.firstname,
              data.lastname,
              hash,
              new Date().toLocaleString(),
              usertype_id_default,
              false
            ]
          );
        })
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
        .query("DELETE FROM users WHERE id = $1 returning id", [data.id])
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
      if (!data.id || !data.name) {
        reject("error: id and/or name missing");
      } else {
        db
          .query(
            "UPDATE users SET firstname = $2 WHERE id = $1 returning name",
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
      if (!data.id || !data.name) {
        reject("error: id and/or name missing");
      } else {
        db
          .query(
            "UPDATE users SET lastname = $2 WHERE id = $1 returning name",
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

  updateEmail: function(data) {
    return new Promise(function(resolve, reject) {
      if (!data.id || !data.email) {
        reject("error: id and/or email missing");
      } else {
        validateEmail(data.email)
          .then(function() {
            return db.query(
              "UPDATE users SET email = $2 WHERE id = $1 returning email",
              [data.id, data.email]
            );
          })
          .then(function(result) {
            resolve(result.rows[0]);
          })
          .catch(function(err) {
            reject(err);
          });
      }
    });
  },

  updatePassword: function(data) {
    return new Promise(function(resolve, reject) {
      if (!data.id || !data.password) {
        reject("error: id and/or password missing");
      } else {
        validatePassword(data.password, 6)
          .then(function() {
            return hashPassword(data.password);
          })
          .then(function(hash) {
            return db.query(
              "UPDATE users SET password = $2 WHERE id = $1 returning id",
              [data.id, hash]
            );
          })
          .then(function(result) {
            resolve(result.rows[0]);
          })
          .catch(function(err) {
            reject(err);
          });
      }
    });
  },

  authenticate: function(data) {
    return new Promise(function(resolve, reject) {
      if (!data.email || !data.password) {
        reject("error: email and/or password missing");
      } else {
        // change all of this to one transaction?
        findOneByEmail(data.email)
          .then(function(user) {
            // Reset login attempts if more than 15 minutes have passed
            if (Date.now() - user.last_login_attempt >= 900000) {
              user.login_attempts = -1;
            }
            return db.query(
              "UPDATE users SET last_login_attempt = now(), login_attempts = $2 WHERE email = $1 returning *",
              [data.email, user.login_attempts + 1]
            );
          })
          .then(function(result) {
            if (result.rows[0].login_attempts < 1000) {
              // TODO decrease the number
              return result.rows[0];
            } else {
              reject(
                "error: attempting to login too frequently, try again in 15 minutes"
              );
            }
          })
          .then(function(user) {
            return verifyPassword(data.password, user);
          })
          .then(function(result) {
            resolve({ isAuthorized: result.isValid, id: result.id });
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
      .query("SELECT * FROM users WHERE id = $1", [id])
      .then(function(result) {
        if (result.rows[0]) {
          resolve(result.rows[0]);
        } else {
          reject("no user found");
        }
      })
      .catch(function(err) {
        reject(err);
      });
  });
}

function findOneByEmail(email) {
  return new Promise(function(resolve, reject) {
    db
      .query("SELECT * FROM users WHERE email = $1", [email])
      .then(function(result) {
        if (result.rows[0]) {
          resolve(result.rows[0]);
        } else {
          reject("no user found");
        }
      })
      .catch(function(err) {
        reject(err);
      });
  });
}

function hashPassword(password) {
  return new Promise(function(resolve, reject) {
    try {
      var hash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
      resolve(hash);
    } catch (err) {
      reject(err);
    }
  });
}

function validateUserData(data) {
  return new Promise(function(resolve, reject) {
    if (!data.password || !data.email) {
      // console.log("email and/or password missing");
      reject("email and/or password missing");
    } else {
      validatePassword(data.password, 6)
        .then(function() {
          return validateEmail(data.email);
        })
        .then(function() {
          resolve();
        })
        .catch(function(err) {
          reject(err);
        });
    }
  });
}

function validateEmail(email) {
  return new Promise(function(resolve, reject) {
    if (typeof email !== "string") {
      // console.log("email must be a string");
      reject("email must be a string");
    } else {
      var re = new RegExp(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      );
      if (re.test(email)) {
        resolve();
      } else {
        // console.log("provided email does not match proper email format");
        reject("provided email does not match proper email format");
      }
    }
  });
}

function validatePassword(password, minCharacters) {
  return new Promise(function(resolve, reject) {
    if (typeof password !== "string") {
      reject("password must be a string");
    } else if (password.length < minCharacters) {
      // console.log(
      //   "password must be at least " + minCharacters + " characters long"
      // );
      reject("password must be at least " + minCharacters + " characters long");
    } else {
      resolve();
    }
  });
}

function verifyPassword(password, user) {
  return new Promise(function(resolve, reject) {
    try {
      var hash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
      if (hash == user.password) {
        resolve({ isValid: true, id: user.id });
      } else {
        resolve({ isValid: false, id: user.id });
      }
    } catch (err) {
      reject(err);
    }
  });
}
