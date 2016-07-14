'use strict';
var EventEmitter = require('events').EventEmitter;

const Promise = require('bluebird');
const zerorpc = require('zerorpc');

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
  // Validate and then send a command to build the docker container.
  return Promise.resolve(this.connect(options))
    .then(this.validate(options))
    .then(this.client.invoke("build", args, (error, res, ...rest) => {
      console.log(res);
    }))
    .then(this.disconnect(options));
};

Builder.prototype.connect = function (options) {
  // Set up ZeroRPC client.
  this.client = new zerorpc.Client();
  this.client.connect(this.server + this.port);
};

Builder.prototype.disconnect = function (options) {
  this.client.close();
};

Builder.prototype.validate = function (options) {
  // Send a command via ZeroRPC to neuron-build to validate the build script.
  return this.client.invoke("validate", options, (error, res, ...rest) => {
    console.log(res);
  });
};
