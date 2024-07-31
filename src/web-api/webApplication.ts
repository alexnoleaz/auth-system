import cors, { CorsOptions, CorsOptionsDelegate, CorsRequest } from 'cors';
import express, { Application, IRouter, NextFunction, Request, Response, Router } from 'express';
import helmet from 'helmet';
import { Server } from 'http';
import { INTERNAL_SERVER_ERROR } from 'http-status';
import { ServerNotInitializedError } from './serverNotInitializedError';
import { Configuration } from '../domain/shared';
import { AppConfiguration } from '../infrastructure/shared';

export class WebApplication {
  private readonly _express: Application;
  private readonly _configuration: Configuration;
  private _server?: Server;

  constructor() {
    this._express = express();
    this._configuration = new AppConfiguration();
    this.configureMiddlewares();
  }

  get server() {
    if (!this._server) throw new ServerNotInitializedError();
    return this._server;
  }

  get configuration() {
    return this._configuration;
  }

  addCors(options?: CorsOptions | CorsOptionsDelegate<CorsRequest>) {
    this._express.use(cors(options));
  }

  addRoutes(routes?: IRouter) {
    this._express.use('/api', routes ?? this.defaultRoutes());
    this._express.use(this.errorHandler);
  }

  listen(port: number) {
    return new Promise<void>((resolve) => {
      this._server = this._express.listen(port, () => {
        console.log(`\n\tServer is running at http://localhost:${port}`);
        console.log('\tPress Ctrl-C to stop\n');
        resolve();
      });
    });
  }

  stop() {
    return new Promise<void>((resolve, reject) => {
      !this._server ? resolve() : this._server.close((error) => (error ? reject(error) : resolve()));
    });
  }

  private configureMiddlewares() {
    this._express.use(express.json());
    this._express.use(express.urlencoded({ extended: true }));
    this._express.use(helmet());
  }

  private defaultRoutes() {
    return Router().get('/ping', (_, res) => res.send('pong'));
  }

  private errorHandler(error: Error, _: Request, res: Response, next: NextFunction) {
    console.error(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}
