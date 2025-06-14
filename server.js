const fastify = require('fastify')({ logger: true });
const websocketPlugin = require('@fastify/websocket');
const { setupMatchmaking } = require('./utils/matchmakingUtils');
const config = require('./config/config');

fastify.register(websocketPlugin, {
  options: { maxPayload: 1048576 }
});

fastify.register(async function (fastify) {
  setupMatchmaking(fastify);
});

const start = async () => {
  try {
    await fastify.listen({ port: config.port, host: config.host });
    console.log(`Server listening on ${config.host}:${config.port}`);
  } 
  catch (err)
  {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
