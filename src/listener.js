'use strict';
var EventEmitter = require('events').EventEmitter;

const nconf = require('nconf');
const Promise = require('bluebird');
const winston = require('winston');
const zerorpc = require('zerorpc');

const log = winston.loggers.get('terminal');

Promise.longStackTraces();

// TODO: Modify listener to use Express rather than zerorpc. We want to set
// this up as a web server rather than an application server that only runs on
// one machine or network.

function Listener(options) {
	if (!(this instanceof Listener)) {
		throw new TypeError('Class constructor Listener cannot be invoked without \'new\'');
	}

  EventEmitter.call(this);

	options = options || {};

  this.server = null;

  this.port = options.listenerPort || 4197;
  this.server = options.listenerIP || "tcp://127.0.0.1:";
}

module.exports = Listener;

Listener.prototype.start = function (options) {
  // Set up ZeroRPC server.
  log.info('Start listener:', {port: this.port});
  this.server = new zerorpc.Server({
    listen: function (name, reply) {
      // Do stuff.

      // Add item to queue in manager.
      reply(null, "Message received.");
    },

    status: function (name, reply) {

      reply(null, "Working hard.");
    }
  });
  this.server.bind("tcp://0.0.0.0:" + 4194);

};

Listener.prototype.stop = function () {
  log.info('Stopping listener.');
  this.server.close();
};
