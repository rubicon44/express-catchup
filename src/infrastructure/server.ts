import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import userRouter from './routes/users';

const server = express();

// view engine setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'jade');

server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
// 静的ファイルの提供設定
server.use('/assets', express.static(path.join(__dirname, 'assets')));

// CORS ミドルウェアを追加
server.use(cors());

// routing
server.use('/', indexRouter);
server.use('/', userRouter);

// catch 404 and forward to error handler
server.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// error handler
server.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default server;
