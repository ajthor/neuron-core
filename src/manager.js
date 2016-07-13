'use strict';
var EventEmitter = require('events').EventEmitter;

const Builder = require('./builder');

const nconf = require('nconf');
const Promise = require('bluebird');
const winston = require('winston');
const zerorpc = require('zerorpc');

const log = winston.loggers.get('terminal');

Promise.longStackTraces();

function Manager(options) {
	if (!(this instanceof Manager)) {
		throw new TypeError('Class constructor Manager cannot be invoked without \'new\'');
	}

  EventEmitter.call(this);

	options = options || {};

  // Set up ZeroRPC server.
  // this.server = new zerorpc.Server({
  //   build: function(name, reply) {
  //     reply(null, "Build: " + name.weeble);
  //   }
  // });
  // this.server.bind("tcp://0.0.0.0:" + 4197);

  // Set up ZeroRPC client.
  // this.buildClient = new zerorpc.Client();
  // this.buildClient.connect("tcp://127.0.0.1:" + 4197);
}

module.exports = Manager;

Manager.prototype._build = function (options) {
  let bldr = new Builder(options);
  // Object to pass to neuron-build build function.
  let args = {weeble: "wobble"};

  return Promise.resolve(bldr.build(args, options));
};

Manager.prototype._createWorker = function (options) {
  // Object to pass to neuron-worker.
  let args = {weeble: "wobble"};

  return Promise.resolve(this.wrkr.run(args, options));
};

Manager.prototype.run = function(options) {
  log.debug('Running script.');

  return this._build();
  // this.bldr.client.close();

};
