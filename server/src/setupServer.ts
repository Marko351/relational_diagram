import { Application, json, urlencoded, Response, Request, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';

import applicationRoutes from '@root/routes';
import { config } from '@root/config';
import { CustomError, IErrorResponse } from '@globals/helpers/error-handler.helpers';
import { HTTP_STATUS } from '@globals/constants/http-statuses.constants';

const SERVER_PORT = 5005;
const logger = config.createLogger('setupServer');

export class FactoringServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routeMiddleware(this.app);
    this.globalErrorHandler(this.app);
    this.startServer(this.app);
  }

  private securityMiddleware(app: Application): void {
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: config.CLIENT_URL,
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      })
    );
  }

  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
    app.use(cookieParser());
  }

  private routeMiddleware(app: Application): void {
    applicationRoutes(app);
  }

  private globalErrorHandler(app: Application): void {
    app.all('*', async (req: Request, res: Response) => {
      res.status(HTTP_STATUS.HTTP_NOT_FOUND).json({ message: `${req.originalUrl} not found!` });
    });

    app.use((error: IErrorResponse, req: Request, res: Response, next: NextFunction) => {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json(error.serializeErrors());
      }
      next(error);
    });
  }

  private async startServer(app: Application): Promise<void> {
    try {
      const httpServer: http.Server = new http.Server(app);
      // const socketIO: Server = await this.createSocketIO(httpServer);
      this.startHttpServer(httpServer);
      // this.socketIOConnections(socketIO);
    } catch (err) {
      logger.error(err);
    }
  }

  private async createSocketIO(httpServer: http.Server): Promise<Server> {
    const io: Server = new Server(httpServer, {
      cors: {
        origin: config.CLIENT_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      },
    });

    return io;
  }

  private startHttpServer(httpServer: http.Server): void {
    logger.info(`Server has started with process ${process.pid}`);
    httpServer.listen(config.SERVER_PORT, () => {
      logger.info(`Server running on port ${config.SERVER_PORT}`);
    });
  }

  private socketIOConnections(io: Server): void {
    logger.info({ msg: 'This will be implemented in the future', io });
  }
}
