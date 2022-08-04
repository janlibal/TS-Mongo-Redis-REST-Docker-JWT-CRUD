require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import config from 'config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectMongoDB from './utils/connectMongo';

import routes from './routes/routes'


const app = express();

app.use(express.json({ limit: '10kb' }));

app.use(cookieParser());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(
  cors({
    origin: config.get<string>('origin'),
    credentials: true,
  })
);

routes(app)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const port = config.get<number>('port');

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
  connectMongoDB();
});