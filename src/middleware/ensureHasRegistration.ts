import { NextFunction, Request, Response } from 'express';

import AppError from '../errors/AppError';

import { DBClient } from '../services/DBClient';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const userID = request.headers.id as string;

  if (!userID) {
    throw new AppError('Usuário não autenticado.', 403);
  }

  const prisma = DBClient.getInstance().prisma;

  const user = await prisma.user.findUnique({
    where: {
      id: userID,
    },
  });

  if (!user) throw new AppError('Usuário não encontrado.', 403);

  return next();
}
