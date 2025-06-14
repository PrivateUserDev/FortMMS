const crypto = require('crypto');

function handleMatchmakingFlow(connection) {
  if (connection.socket.protocol.toLowerCase().includes("xmpp")) {
    return connection.socket.close();
  }

  const ticketId = crypto.createHash('md5').update(`1${Date.now()}`).digest('hex');
  const matchId = crypto.createHash('md5').update(`2${Date.now()}`).digest('hex');
  const sessionId = crypto.createHash('md5').update(`3${Date.now()}`).digest('hex');

  const sendStatusUpdate = (state, additionalPayload = {}) => {
    connection.socket.send(JSON.stringify({
      name: "StatusUpdate",
      payload: {
        state,
        ...additionalPayload
      }
    }));
  };

  setTimeout(() => sendStatusUpdate("Connecting"), 200);
  
  setTimeout(() => sendStatusUpdate("Waiting", {
    totalPlayers: 1,
    connectedPlayers: 1
  }), 1000);
  
  setTimeout(() => sendStatusUpdate("Queued", {
    ticketId,
    queuedPlayers: 0,
    estimatedWaitSec: 0,
    status: {}
  }), 2000);
  
  setTimeout(() => sendStatusUpdate("SessionAssignment", {
    matchId
  }), 6000);
  
  setTimeout(() => {
    connection.socket.send(JSON.stringify({
      name: "Play",
      payload: {
        matchId,
        sessionId,
        joinDelaySec: 1
      }
    }));

    setTimeout(() => {
      connection.socket._socket.destroy();
    }, 100);
  }, 8000);
}

function setupMatchmaking(fastify) {
  fastify.get('/matchmaking', { websocket: true }, (connection, req) => {
    handleMatchmakingFlow(connection);
    if (isIPBanned(ip)) {
      console.log(`Blocked Connection from a banned ip ${ip}`);
      return connection.socket.close();
    }
      
    connection.socket.on('message', message => {});
    connection.socket.on('close', () => {});
  });
}

module.exports = {
  setupMatchmaking,
};
