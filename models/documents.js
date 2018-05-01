var Promise = require("promise");
var config = require("./../config/config");
var db = require("./../config/database");
const CryptoJS = require("crypto-js");

module.exports = {
  findAllTypes: function() {
    return new Promise(function(resolve, reject) {
      db
        .query("SELECT * FROM documenttype_dct ORDER BY id", [])
        .then(function(results) {
          resolve(results.rows);
        })
        .catch(function(err) {
          console.log(err);
          reject(err);
        });
    });
  }
};
