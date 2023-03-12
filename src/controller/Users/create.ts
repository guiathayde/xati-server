import { Request, Response } from 'express';

import AppError from '../../errors/AppError';

import { DBClient } from '../../services/DBClient';

export async function create(request: Request, response: Response) {
  const { id, name, email, avatar, phoneNumber } = request.body;

  if (!id || !name || !email || !avatar || !phoneNumber) {
    throw new AppError('Nome, e-mail ou senha vazia.', 403);
  }

  const prisma = DBClient.getInstance().prisma;

  const verifyEmail = await prisma.user.findUnique({
    where: { email, phoneNumber },
  });
  if (verifyEmail) {
    throw new AppError('Usuário já cadastrado.', 403);
  }

  const user = await prisma.user.create({
    data: {
      id,
      name,
      email,
      avatar,
      phoneNumber,
    },
  });

  return response.status(201).json(user);
}
