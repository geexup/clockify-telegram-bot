import { IBotEnvironment } from '../environment.interface';

export const prod: IBotEnvironment = {
  BOT_TOKEN: '<Your bot token>',
  MONGODB_URI: 'mongodb://mongodb:27017/clockify-bot'
  // IF proxy is used
  // PROXY: 'https://<Proxy IP>:<port>'
};
