'use strict';
var EventEmitter = require('events').EventEmitter;

const zerorpc = require('zerorpc');
const Promise = require('bluebird');

function Listener(options) {
	if (!(this instanceof Manager)) {
		throw new TypeError('Class constructor Manager cannot be invoked without \'new\'');
	}

	options = options || {};

  this.server = null;

  this.port = options.builderPort || 4197;
  this.server = options.builderIP || "tcp://127.0.0.1:";
}

module.exports = Listener;

Listener.prototype.listen = function () {
  // Set up ZeroRPC server.
  this.server = new zerorpc.Server({
    listen: function(name, reply) {
      reply(null, );
    }
  });
  this.server.bind("tcp://0.0.0.0:" + 4194);

};
