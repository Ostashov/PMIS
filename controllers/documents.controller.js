var Promise = require("promise");
var config = require("./../config/config");
var Documents = require("./../models/documents");

module.exports = {
  listOfTypes: function() {
    return new Promise(function(resolve, reject) {
      Documents.findAllTypes()
        .then(function(result) {
          resolve(result);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }
};
