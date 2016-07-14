'use strict';
var EventEmitter = require('events').EventEmitter;

const Builder = require('./builder');
const Worker = require('./worker');

const Promise = require('bluebird');
const zerorpc = require('zerorpc');

Promise.longStackTraces();

function Manager(options) {
	if (!(this instanceof Manager)) {
		throw new TypeError('Class constructor Manager cannot be invoked without \'new\'');
	}

  EventEmitter.call(this);

	options = options || {};
}

module.exports = Manager;

Manager.prototype._build = function (options) {
  let bldr = new Builder(options);
  // Object to pass to neuron-build build function.
  let args = {weeble: "wobble"};

  return Promise.resolve(bldr.build(args, options));
};

Manager.prototype._createWorker = function (options) {
  let wrkr = new Worker(options);
  // Object to pass to neuron-worker.
  let args = {weeble: "wobble"};

  return Promise.resolve(wrkr.run(args, options));
};

Manager.prototype.run = function(options) {
  return Promise.resolve(this._build())
    .then(this._createWorker(script, options));
};
