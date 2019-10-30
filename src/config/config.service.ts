import defaultEnv from './default/config.default';
import ProEnv from './default/config.production';

type envObject = { [key: string]: any }
export class ConfigService {
  private readonly envConfig: envObject;
  constructor() {
    const node_env = process.env.NODE_ENV;
    this.envConfig = {};
    if (node_env === 'production') {
      this.envConfig = ProEnv;
    }
  }

  get(key: string): any {
    return this.envConfig[key] || defaultEnv[key];
  }
}