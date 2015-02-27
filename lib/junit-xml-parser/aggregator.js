var parser = require('./parser');
var fs = require('fs');
var path = require('path');
var async = require('async');
var _ = require('lodash');
var q = require('q');

function getFilesFromFolder(folderPath) {
  var files = fs.readdirSync(folderPath);
  // console.log("getFilesFromFolder", folderPath)

  files = _.reduce(files, function(memo, file) {

    var p = path.join(folderPath, file);
    var stat = fs.statSync(p);
    if (stat.isDirectory()) {
      memo = _.union(memo, getFilesFromFolder(p));
    }
    else {
      memo.push(p);
    }
    return memo;
  }, []);

  return files;
}

function fromFolder(folderPath) {
  var files = getFilesFromFolder(folderPath);
  
  console.log("files", files);
  return fromFiles(files);
}

function fromFiles(listOfFiles) {
  var deferred = q.defer();

  console.log("fromFiles", listOfFiles);

  var listOfReads = _(listOfFiles).map(function (file) {
    return function (callback) { fs.readFile(file, callback); };
  }).value();

  // console.log("fromFiles listOfReads", listOfReads);

  async.series(listOfReads, function (error, contents) {
    // console.log("read file", error, (contents != null), contents.toString())
    if (error) {
      console.log("unable to read file", error);
      deferred.reject(new Error(error));
    } else {

      // console.log("string", contents.length)

      var promises = exports.strings(contents);

      q.all(promises)
        .then(function(out) {
          // console.log("out", out.length);
          out = _.pluck(out, "suite");
          deferred.resolve(out);
        });
    }
  });

  return deferred.promise;
}

function fromStrings(listOfStrings) {
  // console.log("listOfStrings", listOfStrings)
  return _.map(listOfStrings, parser.parse);
}

exports.folder = fromFolder;
exports.files = fromFiles;
exports.strings = fromStrings;
