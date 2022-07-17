export default {
    env: {
      doc: 'The application environment.',
      // TODO: use constants for different environments
      format: ['production', 'development', 'staging', 'test'],
      default: 'development',
      env: 'NODE_ENV',
    },
    ip: {
      doc: 'The IP address to bind.',
      format: 'ipaddress',
      default: '127.0.0.1',
      env: 'IP_ADDRESS',
    },
    port: {
      doc: 'The port to bind.',
      format: 'port',
      default: 8080,
      env: 'PORT',
      arg: 'port',
    },
    isLoggingEnabled: {
      doc: 'The application logging enabled',
      format: Boolean,
      default: true,
      env: 'IS_LOGGING_ENABLED',
    },
    deckUrl: {
      doc: 'Url to fetch shuffled deck',
      format: String,
      env: 'DECK_URL',
      default: null,
    },
    playerName: {
      doc: 'The player name',
      format: String,
      default: 'Andrey',
      env: 'PLAYER_NAME',
    },
    botName: {
      doc: 'The player name',
      format: String,
      default: 'Bot',
      env: 'BOT_NAME',
    },
};
  