import { Configuration } from '../../../../domain/shared';

export class MongoConfiguration {
  readonly url: string;
  readonly database?: string;

  constructor(configuration: Configuration) {
    this.url = configuration.get('mongodb.url');
    if (configuration.has('mongodb.database')) this.database = configuration.get('mongodb.database');
  }
}
