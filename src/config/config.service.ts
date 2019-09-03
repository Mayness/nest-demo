import defaultEnv from './default/config.default';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

type envObject = { [key: string]: string }
export class ConfigService {
  private readonly envConfig: envObject;
  constructor(filePath: string) {
    this.envConfig = {};
    try {
      const envPath = path.join(__dirname, '../../.env/', filePath);
      this.envConfig = dotenv.parse(fs.readFileSync(envPath));
    } catch {
    }
  }

  get(key: string): string {
    return this.envConfig[key] || process.env[key] || defaultEnv[key];
  }
}