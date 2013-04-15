var fs = require('fs');

var q = require('q');
var sinon = require('sinon');
var assert = require('chai').assert;

var parser = require('junit-xml-parser').parser;
var aggregator = require('junit-xml-parser').aggregator;

suite('aggregator', function () {
  setup(function () {
    sinon.stub(parser, 'parse');
    sinon.stub(fs, 'readFile');
  });

  teardown(function () {
    parser.parse.restore();
    fs.readFile.restore();
  });

  test('from files read files and calls from strings', function (done) {
    var files = [ 'file1.xml', 'file2.xml' ];

    sinon.stub(aggregator, 'strings');

    q.fcall(function () {
      aggregator.strings.withArgs([ 'string1', 'string2' ]).returns('tests');
      fs.readFile.withArgs('file1.xml').yields(undefined, 'string1');
      fs.readFile.withArgs('file2.xml').yields(undefined, 'string2');

      aggregator.files(files).then(function (result) { assert.deepEqual(result, 'tests'); });
    })['finally'](function () {
      aggregator.strings.restore();
      done();
    });
  });

  test('from strings', function () {
    var strings = [ 'string1', 'string2' ];

    parser.parse.withArgs('string1').returns('test1');
    parser.parse.withArgs('string2').returns('test2');

    assert.deepEqual(aggregator.strings(strings), [ 'test1', 'test2' ]);
  });
});
