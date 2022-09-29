import { ConfigSchema } from './config.schema';

export interface IConfig {
  get<T extends keyof ConfigSchema>(key: T): ConfigSchema[T];
}
