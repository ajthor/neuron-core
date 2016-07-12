'use strict';
var EventEmitter = require('events').EventEmitter;

const zerorpc =  require('zerorpc');
const Builder = require('./builder');

const Promise = require('bluebird');

function Manager(options) {
	if (!(this instanceof Manager)) {
		throw new TypeError('Class constructor Manager cannot be invoked without \'new\'');
	}

  EventEmitter.call(this);

	options = options || {};

  this.bldr = new Builder(options);
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
  return Promise.resolve(this.bldr.build());
};

Manager.prototype.run = function(options) {
  this._build();

  console.log('Running.');
};
