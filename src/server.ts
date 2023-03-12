import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { uploadConfig } from './config/uploadFile';

import routes from './routes';
import AppError from './errors/AppError';

const app = express();

const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
);

app.listen(process.env.PORT, () => {
  console.log('Server is running on port ' + process.env.PORT);
});
