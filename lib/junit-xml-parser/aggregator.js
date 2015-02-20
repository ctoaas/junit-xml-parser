var parser = require('./parser');
var fs = require('fs');
var path = require('path');
var async = require('async');
var _ = require('lodash');
var q = require('q');

function fromFolder(folderPath) {
  var files = fs.readdirSync(folderPath);
  files = _.map(files, function(file) {
    return path.join(folderPath, file);
  });

  // console.log("files", files);
  return fromFiles(files);
}

function fromFiles(listOfFiles) {
  var deferred = q.defer();

  var listOfReads = _(listOfFiles).map(function (file) {
    return function (callback) { fs.readFile(file, callback); };
  }).value();

  async.parallel(listOfReads, function (error, contents) {
    if (error) {
      deferred.reject(new Error(error));
    } else {

      var promises = exports.strings(contents);

      q.all(promises)
        .then(function(out) {
          deferred.resolve(out);
        });
    }
  });

  return deferred.promise;
}

function fromStrings(listOfStrings) {
  return _.map(listOfStrings, parser.parse);
}

exports.folder = fromFolder;
exports.files = fromFiles;
exports.strings = fromStrings;
