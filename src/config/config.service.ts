import defaultEnv from './default/config.default';
import ProEnv from './default/config.production';

type envObject = { [key: string]: any };
export class ConfigService {
  private readonly envConfig: envObject;
  constructor() {
    const node_env = process.env.NODE_ENV;
    this.envConfig = {};
    if (node_env === 'product') {
      this.envConfig = ProEnv || {};
    }
  }

  // key 为 xx.xx.xx
  get(key: string): any {
    const path = key.split('.');
    let env = this.envConfig;
    let defaults = defaultEnv;
    for (let item of path) {
      env = env[item] || {};
      defaults = defaults[item];
    }
    return (env && typeof env !== 'object') || Object.keys(env).length
      ? env
      : defaults;
  }
}
