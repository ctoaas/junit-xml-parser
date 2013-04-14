var q = require('q');
var assert = require('chai').assert;
var data = require('../support/data');
var parser = require('junit-xml-parser').parser;

suite('parser', function () {
  test('error', function (done) {
    function executeTest(parsed) {
      assert.deepEqual(parsed, {
        'suite': {
          'name': 'errors happened',
          'time': 156.71,
          'summary': {
            'tests': 1,
            'failures': 0,
            'skipped': 0,
            'errors': 1
          },
          'tests': [
            {
              'name': 'tried to do something and exception happened',
              'time': 155.16,
              'failure': {
                'type': 'Selenium::WebDriver::Error::TimeOutError',
                'message': 'timed out after 120 seconds',
                'raw': [
                  '',
                  'timed out after 120 seconds (Selenium::WebDriver::Error::TimeOutError)',
                  'Selenium::WebDriver::Error::TimeOutError:',
                  'timed out after 120 seconds',
                  '     ./tests/spec/support/page_objects/base.rb:11:in `wait_until\'',
                  '     ./tests/spec/support/page_objects/data_table.rb:26:in `wait_for_table_to_load\'',
                  '     ./tests/spec/support/page_objects/my_table.rb:18:in `has_rows?\'',
                  '     ./tests/spec/support/page_objects/details_view.rb:200:in `delete_all_items\'',
                  '     ./tests/spec/my_feature/create_and_delete_items.rb:36:in `block (4 levels) in <top (required)>\''
                ].join('\n')
              }
            }
          ],
          'extras': {
            'output': '',
            'errors': ''
          }
        }
      });
    }
    function parse(xml) { return parser.parse(xml).then(executeTest); }
    q.fcall(data.error).then(parse).then(done, done).done();
  });
  test('success', function (done) {
    function executeTest(parsed) {
      assert.deepEqual(parsed, {
        'suite': {
          'name': 'successful test',
          'time': 27.96,
          'summary': {
            'tests': 2,
            'errors': 0,
            'failures': 0,
            'skipped': 0
          },
          'tests': [
            { 'name': 'performs action and it works', 'time': 9.38 },
            { 'name': 'performs another action and it works too', 'time': 18.54 }
          ],
          'extras': {
            'output': 'all good',
            'errors': 'DEPRECATED: using old version of API'
          }
        }
      });
    }
    function parse(xml) { return parser.parse(xml).then(executeTest); }
    q.fcall(data.success).then(parse).then(done, done).done();
  });
});
