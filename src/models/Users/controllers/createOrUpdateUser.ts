import { Request, Response } from 'express';

import AppError from '../../../errors/AppError';

import { createOrUpdateUser as createOrUpdateUserService } from '../services/createOrUpdateUser';

export async function createOrUpdateUser(request: Request, response: Response) {
  const { id, socketId, email, name, phoneNumber } = request.body;

  if (!phoneNumber) {
    throw new AppError('Telefone vazio.', 403);
  }

  const user = await createOrUpdateUserService(
    phoneNumber,
    id,
    socketId,
    email,
    name,
  );

  return response.json(user);
}
