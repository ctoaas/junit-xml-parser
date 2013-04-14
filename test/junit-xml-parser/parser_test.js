var q = require('q');
var assert = require('chai').assert;
var data = require('../support/data');
var parser = require('junit-xml-parser').parser;

suite('parser', function () {
  test('success', function (done) {
    function executeTest(parsed) {
      assert.deepEqual(parsed, {
        'suite': {
          'name': 'successful test',
          'time': '27.964130383',
          'summary': {
            'tests': '2',
            'failures': '0',
            'skipped': '0'
          },
          'tests': [
            { 'name': 'performs action and it works', 'time': '9.378132234' },
            { 'name': 'performs another action and it works too', 'time': '18.540659008' }
          ],
          'extras': {
            'output': 'all good',
            'errors': 'DEPRECATED: using old version of API'
          }
        }
      });
    }
    function parse(successXml) {
      return parser.parse(successXml).then(executeTest);
    }
    q.fcall(data.success).then(parse).then(done, done).done();
  });
});
