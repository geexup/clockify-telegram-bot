export interface IBotEnvironment {
  BOT_TOKEN: string;
  MONGODB_URI: string;
  PROXY?: {
    socksHost: string;
    socksPort: number;
    socksUsername?: string;
    socksPassword?: string;
  };
}
