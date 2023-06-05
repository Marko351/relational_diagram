import express, { Express } from 'express';

import { FactoringServer } from '@root/setupServer';
import { config } from '@root/config';

class Application {
  public initialize(): void {
    this.loadConfig();
    const app: Express = express();
    const server: FactoringServer = new FactoringServer(app);
    server.start();
  }

  private loadConfig(): void {
    config.validateConfig();
  }
}

const application: Application = new Application();
application.initialize();
