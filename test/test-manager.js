'use strict';
import path from 'path';
import test from 'ava';

import Manager from '../src/manager';

test.beforeEach(t => {
  // setup
  t.context.Manager = Manager;
});

test.afterEach(t => {
  // teardown
});

test('Manager is instantiable', t => {
  let instance = new t.context.Manager();
  t.truthy(instance);
});

test('Manager prototype has \'run\' method', t => {
  t.truthy(t.context.Manager.prototype.run);
});

test('Manager prototype has \'_build\' method', t => {
  t.truthy(t.context.Manager.prototype._build);
});

test('Manager prototype has \'_createWorker\' method', t => {
  t.truthy(t.context.Manager.prototype._createWorker);
});
