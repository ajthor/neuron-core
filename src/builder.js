'use strict';
var EventEmitter = require('events').EventEmitter;

const nconf = require('nconf');
const Promise = require('bluebird');
const winston = require('winston');
const zerorpc = require('zerorpc');

var log = winston.loggers.get('terminal');
console.log(log);
Promise.longStackTraces();

// The Builder object is a wrapper for a zeromq call to the neuron-build
// application. Some validation of the request and response is necessary, so
// we do that here.
function Builder(options) {
	if (!(this instanceof Builder)) {
		throw new TypeError('Class constructor Builder cannot be invoked without \'new\'');
	}

  options = options || {};

  this.port = options.builderPort || 4197;
  this.server = options.builderIP || "tcp://127.0.0.1:";

  this.client = null;
}

module.exports = Builder;

Builder.prototype.build = function (args, options) {
  log.info('Building worker box with args:', args);

  // Validate and then send a command to build the docker container.
  return Promise.resolve(this.connect(options))
    .then(this.validate(options))
    .then(this.client.invoke("build", args, (error, res, ...rest) => {
      log.info('Response:', res);
    }))
    .then(this.disconnect(options));
};

Builder.prototype.connect = function (options) {
  // Set up ZeroRPC client.
  this.client = new zerorpc.Client();

  log.debug('Connecting to neuron-builder:', {server: this.server, port: this.port});
  this.client.connect(this.server + this.port);
};

Builder.prototype.disconnect = function (options) {
  log.debug('Closing connection to neuron-builder.');
  this.client.close();
};

Builder.prototype.validate = function (options) {
  log.debug('Validating build script.');

  // Send a command via ZeroRPC to neuron-build to validate the build script.
  return this.client.invoke("validate", options, (error, res, ...rest) => {
    if (res) {
      log.debug('Passed.');
    } else {
      log.debug('Failed.')
    }
    return res;
  });
};
