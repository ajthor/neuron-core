const convict = require('convict');

var cfg = convict({
  ports: {
    // Ports used by the Neuron application are 4194-4198.
    // Port:
    // - 4194: UI
    // - 4195: Listener
    // - 4196: Core
    // - 4197: Builder
    // - 4198: Worker
    builder: {
      doc: 'Port for communicating with builder application.',
      format: 'port',
      default: 4197
    },
    worker: {
      doc: 'Port for communicating with worker application.',
      format: 'port',
      default: 4198
    }
  }
});

cfg.validate();

module.exports = cfg;
