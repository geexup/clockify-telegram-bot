import { IBotEnvironment } from '../environment.interface';

export const dev: IBotEnvironment = {
  BOT_TOKEN: '<Your bot token>',
  MONGODB_URI: 'mongodb://localhost:27017/clockify-bot'
  // IF proxy is used
  // PROXY: 'socks5://username:password@proxy-ip:port'
};
