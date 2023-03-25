import { DBClient } from '../../../services/DBClient';

export async function getChatRoomById(id: string) {
  const prisma = DBClient.getInstance().prisma;

  const room = await prisma.chatRoom.findUnique({
    where: { id },
    select: {
      id: true,
      users: true,
      messages: {
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
      },
    },
  });

  return room;
}
