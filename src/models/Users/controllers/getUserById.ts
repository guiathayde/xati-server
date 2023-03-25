import { Request, Response } from 'express';

import AppError from '../../../errors/AppError';

import { getUserById as getUserByIdService } from '../services/getUserById';

export async function getUserById(request: Request, response: Response) {
  const { id } = request.params;

  if (!id) throw new AppError('Id is required', 400);

  const user = await getUserByIdService(id);

  if (user) return response.json(user);

  return response.status(403);
}
