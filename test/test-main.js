'use strict';
import path from 'path';
import test from 'ava';

test('Main is importable', t => {
  let main = require('../main');
  t.truthy(main);
});
