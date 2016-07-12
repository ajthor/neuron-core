'use strict';
var EventEmitter = require('events').EventEmitter;

const zerorpc = require('zerorpc');
const Promise = require('bluebird');

// The Builder object is a wrapper for a zeromq call to the neuron-build
// application. Some validation of the request and response is necessary, so
// we do that here.
function Builder(options) {
	options = options || {};

  this.port = options.builderPort || 4197;
  this.server = options.builderIP || "tcp://127.0.0.1:";

  // Set up ZeroRPC client.
  this.client = new zerorpc.Client();
  this.client.connect(this.server + this.port);
}

module.exports = Builder;

Builder.prototype.build = function(options) {
  console.log('Building.');

  // Object to pass to neuron-build build function.
  let args = {weeble: "wobble"};

  // Validate and then send a command to build the docker container.
  return Promise.resolve(this.validate(options))
    .then(this.client.invoke("build", args, (error, res, ...rest) => {
      console.log(res);
    }));

  this.client.close();
};

Builder.prototype.validate = function(options) {
  console.log('Validating.');

  // Object to pass to neuron-build validate function.
  let args = {weeble: "wobble"};

  // Send a command via ZeroRPC to neuron-build to validate the build script.
  return this.client.invoke("validate", args, (error, res, ...rest) => {
    if (res) {
      console.log("Everything looks good.");
    } else {
      console.log(":-(");
    }
    return res;
  });
};
