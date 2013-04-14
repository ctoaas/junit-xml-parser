var fs = require('fs');
var q = require('q');
var path = require('path');

function readFile(file) {
  var deferred = q.defer();

  fs.readFile(path.join(__dirname, 'data', file), function (error, data) {
    return error ? deferred.reject(new Error(error)) : deferred.resolve(data.toString());
  });

  return deferred.promise;
}

function target(file) { return function () { return readFile(file + '.xml'); }; }

exports.success = target('success');
exports.error = target('error');
