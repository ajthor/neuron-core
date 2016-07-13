'use strict';
var EventEmitter = require('events').EventEmitter;

const nconf = require('nconf');
const Promise = require('bluebird');
const winston = require('winston');
const zerorpc = require('zerorpc');

const log = winston.loggers.get('terminal');

Promise.longStackTraces();

// The Worker object is a wrapper for a zeromq call to the neuron-worker
// application. Some validation of the request and response is necessary, so
// we do that here.
function Worker(options) {
	if (!(this instanceof Worker)) {
		throw new TypeError('Class constructor Worker cannot be invoked without \'new\'');
	}

  options = options || {};

  this.port = options.workerPort || 4197;
  this.server = options.workerIP || "tcp://127.0.0.1:";

  this.client = null;
}

module.exports = Worker;

Worker.prototype.run = function (args, options) {
  log.info('Sending job to worker.');

  // Validate and then send a command to build the docker container.
  return Promise.resolve(this.connect(options))
    .then(this.validate(options))
    .then(this.client.invoke("build", args, (error, res, ...rest) => {
      log.debug('Response:', res);
    }))
    .then(this.disconnect(options));
};

Worker.prototype.connect = function (options) {
  // Set up ZeroRPC client.
  this.client = new zerorpc.Client();
  this.client.connect(this.server + this.port);
};

Worker.prototype.disconnect = function (options) {
  this.client.close();
};
