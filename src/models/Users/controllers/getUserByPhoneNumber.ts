import { Request, Response } from 'express';

import AppError from '../../../errors/AppError';

import { getUserByPhoneNumber as getUserByPhoneNumberService } from '../services/getUserByPhoneNumber';

export async function getUserByPhoneNumber(
  request: Request,
  response: Response,
) {
  const { phoneNumber } = request.params;

  if (!phoneNumber) throw new AppError('Phone number is required', 400);

  const user = await getUserByPhoneNumberService(phoneNumber);

  if (user) return response.json(user);

  return response.status(403);
}
