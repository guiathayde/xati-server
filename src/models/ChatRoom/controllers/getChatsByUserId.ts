import { Request, Response } from 'express';

import AppError from '../../../errors/AppError';

import { getChatsRoomsByUserId } from '../services/getChatsRoomsByUserId';

export async function getChatsByUserId(request: Request, response: Response) {
  const { id } = request.params;

  if (!id) throw new AppError('Id is required', 400);

  const chats = await getChatsRoomsByUserId(id);

  return response.json(chats);
}
