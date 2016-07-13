'use strict';

const fs = require('fs');
const path = require('path');

const nconf = require('nconf');
const winston = require('winston');

const validate = require('./src/validate');
const Listener = require('./src/listener');
const Manager = require('./src/manager');

// nconf options
nconf.overrides({
  'always': 'be this value'
});

nconf.argv()
  .env()
  .file({file: `${path.join(__dirname, 'config')}/network.json`});

nconf.defaults({
  'l': 'info'
});

// Set up logger.
winston.loggers.add('terminal', {
  console: {
    level: nconf.get('l') || 'info',
    colorize: true,
    label: 'terminal logger'
  }
});
// var log = new winston.Logger({
//   level: nconf.get('l'),
//   transports: [
//     new (winston.transports.Console)()
//   ]
// });

function Neuron (options) {

}

Neuron.prototype.run = function (options) {
  let mgr = new Manager();
  let lstn = new Listener();
  // main
  lstn.start();
  mgr.run();

  lstn.stop();
};

var network = nconf.get('network');

var instance = new Neuron({
  network: network
});

instance.run();
module.exports = instance;
