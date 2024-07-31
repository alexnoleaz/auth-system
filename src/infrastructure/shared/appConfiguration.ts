import { ContentDirectoryFinder } from '../../domain/shared';
process.env.NODE_CONFIG_DIR = ContentDirectoryFinder.calculateContentRootDirectory('web-api');

import config from 'config';
import { Configuration } from '../../domain/shared';

export class AppConfiguration implements Configuration {
  get<T>(value: string): T {
    return config.get(value);
  }

  has(value: string): boolean {
    return config.has(value);
  }
}
