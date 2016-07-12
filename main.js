'use strict';

const fs = require('fs');
const path = require('path');

const zerorpc =  require('zerorpc');

const validate = require('./src/validate');
const Manager = require('./src/manager');

validate();

let mgr = new Manager();

mgr.run();

// nconf.use('file', {file: `${path.join(__dirname, 'config')}/ports.json` });
// console.log(nconf.get('name'));
