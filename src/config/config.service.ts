import defaultEnv from './env/config.default';
import { Logger } from '@nestjs/common';

type envObject = { [key: string]: any };
export class ConfigService {
  private readonly envConfig: envObject;
  constructor(envObject: envObject) {
    this.envConfig = envObject || {};
  }
  static async getEnvFile(env?: string) {
    let currentEnvData = {default: {}};
    if (env) {
      try {
        const data = await import(`./env/config.${env}`);
        currentEnvData = data.default;
      } catch (err) {
        Logger.error(err);
      }
    }
    return new ConfigService(currentEnvData);
  }
  // key 为 xx.xx.xx
  get(key: string): any {
    const path: string[] = key.split('.');
    let env: envObject = this.envConfig;
    let defaults: envObject = defaultEnv;
    for (let item of path) {
      env = env[item] || {};
      defaults = defaults[item];
    }
    return (typeof env !== 'object') || Object.keys(env).length
      ? env
      : defaults;
  }
}
