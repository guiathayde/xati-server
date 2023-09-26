import { Request, Response, NextFunction } from 'express';

import { AppError } from '../errors/AppError';

import admin from '../services/firebase';

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('Token is missing', 401);

  const [, token] = authHeader.split(' ');

  try {
    const decodeValue = await admin.auth().verifyIdToken(token);

    if (!decodeValue) throw new AppError('Invalid JWT token', 401);

    const { uid } = decodeValue;

    request.user = {
      uid,
    };

    return next();
  } catch (err) {
    throw new AppError(`Invalid JWT token: ${JSON.stringify(err)}`, 401);
  }
}
