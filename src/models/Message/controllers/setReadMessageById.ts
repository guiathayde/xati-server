import { Request, Response } from 'express';

import AppError from '../../../errors/AppError';

import { setReadMessageById as setReadMessageByIdService } from '../services/setReadMessageById';

export async function setReadMessageById(request: Request, response: Response) {
  const { id } = request.params;

  if (!id) throw new AppError('Missing message ID', 400);

  const success = await setReadMessageByIdService(id);

  return response.status(success ? 200 : 400);
}
