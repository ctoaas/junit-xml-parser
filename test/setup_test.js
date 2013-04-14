var assert = require('chai').assert;
var data = require('./support/data');

suite('setup', function () {
  test('basic', function () {
    assert.isNotNull(require('junit-xml-parser'));
  });

  test('data', function (done) {
    data.success().then(function (contents) {
      assert.isString(contents);
    })['finally'](done);
  });
});
