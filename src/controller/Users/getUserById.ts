import { Request, Response } from 'express';

import AppError from '../../errors/AppError';

import { DBClient } from '../../services/DBClient';

export async function getUserById(request: Request, response: Response) {
  const { id } = request.params;

  if (!id) throw new AppError('Id is required', 400);

  const prisma = DBClient.getInstance().prisma;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return response.json(user);
  } catch (error) {
    return response.status(500).json(error);
  }
}
