'use strict';
import path from 'path';
import test from 'ava';

import Worker from '../src/worker';

test.beforeEach(t => {
  // setup
  t.context.Worker = Worker;
});

test.afterEach(t => {
  // teardown
});

test('Worker is instantiable', t => {
  let instance = new t.context.Worker();
  t.truthy(instance);
});

test('Worker prototype has \'run\' method', t => {
  t.truthy(t.context.Worker.prototype.run);
});

test('Worker prototype has \'connect\' method', t => {
  t.truthy(t.context.Worker.prototype.connect);
});

test('Worker prototype has \'disconnect\' method', t => {
  t.truthy(t.context.Worker.prototype.disconnect);
});
