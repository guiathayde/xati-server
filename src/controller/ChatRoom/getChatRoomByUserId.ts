import { Request, Response } from 'express';

import AppError from '../../errors/AppError';

import { DBClient } from '../../services/DBClient';

export async function getChatRoomByUserId(
  request: Request,
  response: Response
) {
  const { id } = request.params;

  if (!id) throw new AppError('Id is required', 400);

  const prisma = DBClient.getInstance().prisma;

  try {
    const rooms = await prisma.chatRoom.findMany({
      where: {
        users: {
          some: {
            id: {
              in: id,
            },
          },
        },
      },
      select: {
        id: true,
        users: {
          where: {
            id: {
              notIn: id,
            },
          },
        },
      },
    });

    return response.json(rooms);
  } catch (error) {
    return response.status(500).json(error);
  }
}
