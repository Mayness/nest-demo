import defaultEnv from './env/config.default';
import { Logger } from '@nestjs/common';

type envObject = { [key: string]: any };
export class ConfigService {
  private readonly envConfig: envObject;
  constructor(envObject: envObject) {
    this.envConfig = envObject || {};
  }
  static async getEnvFile(env?: string) {
    let currentEnvData = {};
    if (env) {
      try {
        currentEnvData = await import(`./default/config.${env}`);
      } catch (err) {
        Logger.error(err);
      }
    }
    return new ConfigService(currentEnvData);
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
