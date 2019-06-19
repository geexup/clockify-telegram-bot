import ProxyAgent from 'proxy-agent';
import { IBotEnvironment } from './environment/environment.interface';

const SocksAgent = require('socks5-https-client/lib/Agent');
const HttpsProxyAgent = require('https-proxy-agent');

export function getProxyAgent(proxyEnv: IBotEnvironment['PROXY']): any {
  if (!proxyEnv) return undefined;

  return new ProxyAgent(proxyEnv);
}
