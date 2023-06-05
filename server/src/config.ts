import dotenv from 'dotenv';
import winston, { Logger } from 'winston';

dotenv.config({});

class Config {
  public SERVER_PORT: string | undefined;
  public ACCESS_TOKEN_SECRET: string | undefined;
  public REFRESH_TOKEN_SECRET: string | undefined;
  public NODE_ENV: string | undefined;
  public CLIENT_URL: string | undefined;
  public DB_HOST: string | undefined;
  public DB_PORT: number | undefined;
  public DB_USER: string | undefined;
  public DB_PASSWORD: string | undefined;
  public DB_DATABASE: string | undefined;
  public DB_SSL: string | undefined;

  constructor() {
    this.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
    this.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
    this.NODE_ENV = process.env.NODE_ENV;
    this.SERVER_PORT = process.env.SERVER_PORT;
    this.CLIENT_URL = process.env.CLIENT_URL;
    this.DB_HOST = process.env.DB_HOST;
    this.DB_PORT = process.env.DB_PORT as number | undefined;
    this.DB_USER = process.env.DB_USER;
    this.DB_PASSWORD = process.env.DB_PASSWORD;
    this.DB_DATABASE = process.env.DB_DATABASE;
    this.DB_SSL = process.env.DB_SSL;
  }

  public createLogger(name?: string): Logger {
    return winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json(),
        winston.format.colorize(),
        winston.format.printf((info) => {
          const { timestamp, level, message } = info;
          const formattedMessage = typeof message === 'object' ? JSON.stringify(message) : message;

          return `[${name}] => ${timestamp} [${level}]: ${formattedMessage}`;
        })
      ),
      transports: [new winston.transports.Console()],
    });
  }

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined.`);
      }
    }
  }
}

export const config: Config = new Config();
