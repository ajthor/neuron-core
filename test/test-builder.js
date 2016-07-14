'use strict';
import path from 'path';
import test from 'ava';

import Builder from '../src/builder';

test.beforeEach(t => {
  // setup
  t.context.Builder = Builder;
});

test.afterEach(t => {
  // teardown
});

test('Builder is instantiable', t => {
  let instance = new t.context.Builder();
  t.truthy(instance);
});

test('Builder prototype has \'build\' method', t => {
  t.truthy(t.context.Builder.prototype.build);
});

test('Builder prototype has \'connect\' method', t => {
  t.truthy(t.context.Builder.prototype.connect);
});

test('Builder prototype has \'disconnect\' method', t => {
  t.truthy(t.context.Builder.prototype.disconnect);
});

// test('Builder can establish and close a connection to neuron-build', t => {
//   let instance = new t.context.Builder();
//   Promise.resolve(instance.connect()).then()
// });
