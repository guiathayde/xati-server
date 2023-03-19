import { Request, Response } from 'express';

import AppError from '../../errors/AppError';

import { DBClient } from '../../services/DBClient';

export async function getUserByPhoneNumber(
  request: Request,
  response: Response
) {
  const { phoneNumber } = request.params;

  if (!phoneNumber) throw new AppError('Phone number is required', 400);

  const prisma = DBClient.getInstance().prisma;

  try {
    const user = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    return response.json(user);
  } catch (error) {
    return response.status(500).json(error);
  }
}
