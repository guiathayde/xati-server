import { DBClient } from '../../services/DBClient';

export async function getChatRoomById(id: string) {
  const prisma = DBClient.getInstance().prisma;

  const room = await prisma.chatRoom.findUnique({
    where: { id },
    select: {
      users: true,
    },
  });

  return room;
}
