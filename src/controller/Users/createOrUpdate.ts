import { Request, Response } from 'express';

import AppError from '../../errors/AppError';

import { DBClient } from '../../services/DBClient';

export async function createOrUpdateUser(request: Request, response: Response) {
  const { id, socketId, email, name, phoneNumber } = request.body;

  if (!phoneNumber) {
    throw new AppError('Telefone vazio.', 403);
  }

  const prisma = DBClient.getInstance().prisma;

  const user = await prisma.user.upsert({
    where: { phoneNumber },
    update: { id, socketId, name, email },
    create: { id, socketId, name, email, phoneNumber },
  });

  return response.json(user);
}
