import { Connection, createConnection } from 'mongoose';
import { DatabaseConnectionError } from '../databaseConnectionError';
import { MongoConfiguration } from './mongoConfiguration';

export class MongoClient {
  private readonly _configuration: MongoConfiguration;
  private _connection?: Connection;
  private _isConnected = false;

  constructor(configuration: MongoConfiguration) {
    this._configuration = configuration;
  }

  get connection() {
    if (!this._isConnected || !this._connection) throw new DatabaseConnectionError();
    return this._connection;
  }

  async connect() {
    if (this._isConnected && this._connection) return;

    try {
      this._connection = await createConnection(this._configuration.url, {
        dbName: this._configuration.database,
      }).asPromise();
      this._isConnected = true;
      console.log('MongoDB: connection established');
    } catch (error) {
      console.error('MongoDB: connection failed', error);
      throw new DatabaseConnectionError('Failed to connect to MongoDB.');
    }
  }
}
