const config = {
  port: process.env.PORT || 80,
  host: process.env.HOST || '0.0.0.0',

  wsMaxPayload: 1048576,

  matchmakingTimeout: 30000,
  maxQueueSize: 100,
};

module.exports = config;