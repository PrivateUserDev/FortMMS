const config = {
  port: process.env.PORT || 80, // port the server will run on
  host: process.env.HOST || '0.0.0.0', // to forward this with cloudflare, create a Zero Trust tunnel and get it from http://127.0.0.1:80
  wsMaxPayload: 1048576,

  matchmakingTimeout: 30000,
  maxQueueSize: 100, // max amount of people in one queue
  bannedIPs: new Set([
    'ip here',
  ]),

  bEnableGameSessions: false, // enables gamesessions, you need additional code for this in your gameserver.
  bEnableQueues: false, // enables queue's
  bEnableBackfil: false, // let's people join a server until the match started (instant queues)
};

module.exports = config;
