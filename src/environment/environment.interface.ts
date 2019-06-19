export interface IBotEnvironment {
  BOT_TOKEN: string;
  MONGODB_URI: string;

  // Will be set to process.env.NODE_ENV
  NODE_ENV: 'development' | 'production';

  /**
   * Proxy URL
   *
   * Examples: \
   * `http://proxy-server-over-tcp.com:3128` \
   * `https://proxy-server-over-tls.com:3129` \
   * `socks://username:password@some-socks-proxy.com:9050` \
   * `socks4://some-socks-proxy.com:9050` \
   * `pac+http://www.example.com/proxy.pac`
   *
   * @see https://github.com/TooTallNate/node-proxy-agent
   */
  PROXY?: string;
}
