var _ = require('lodash');

function from(raw) {
  var rawSuite = raw.testsuite || { $: {} };

  var parsed = {
    'name': rawSuite.$.name,
    'time': rawSuite.$.time,
    'summary': {
      'tests': rawSuite.$.tests,
      'failures': rawSuite.$.failures,
      'skipped': rawSuite.$.skipped
    },
    'tests': _(rawSuite.testcase).map(function (test) {
      return {
        'name': test.$.name,
        'time': test.$.time
      };
    }).value(),
    'extras': {
      'output': rawSuite['system-out'][0],
      'errors': rawSuite['system-err'][0]
    }
  };

  return { 'suite': parsed };
}

exports.from = from;
