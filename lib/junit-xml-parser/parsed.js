var _ = require('lodash');

function time(raw) {
  return +(+(raw || 0)).toFixed(2);
}

function from(raw) {
  var rawSuite = raw.testsuite || { $: {} };

  var parsed = {
    'name': rawSuite.$.name,
    'time': time(rawSuite.$.time),
    'summary': {
      'tests': time(rawSuite.$.tests),
      'failures': time(rawSuite.$.failures),
      'skipped': time(rawSuite.$.skipped),
      'errors': time(rawSuite.$.errors)
    },
    'tests': _(rawSuite.testcase).map(function (test) {
      var failure = (test.failure || [])[0] || { $: {}, _: '' };
      return _({
        'name': test.$.name,
        'time': time(test.$.time),
        'failure': {
          'type': failure.$.type,
          'message': failure.$.message,
          'raw': failure._
        }
      }).tap(function (result) { !test.failure && delete result.failure; }).value();
    }).value(),
    'extras': {
      'output': (!_(rawSuite['system-out'][0]).isObject() && rawSuite['system-out'][0]) || '',
      'errors': (!_(rawSuite['system-err'][0]).isObject() && rawSuite['system-err'][0]) || ''
    }
  };

  return { 'suite': parsed };
}

exports.from = from;
