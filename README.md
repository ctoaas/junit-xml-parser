junit-xml-parser [![Build Status](https://travis-ci.org/MACSkeptic/junit-xml-parser.png?branch=master)](https://travis-ci.org/MACSkeptic/junit-xml-parser)
================

## install

```
npm instal junit-xml-parser [--save]
```

## usage

if you do:

```javascript
var parser = require('junit-xml-parser').parser;
parser.parse('<...junit xml...>').then(function (results) { ... });
```

results will look somewhat like this:

```javascript
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
```

