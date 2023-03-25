import { DBClient } from '../../../services/DBClient';

export async function createChatRoomByUsersIds(idUsers: string[]) {
  const prisma = DBClient.getInstance().prisma;

  const newRoom = await prisma.chatRoom.create({
    data: {
      users: {
        connect: idUsers.map(id => ({ id })),
      },
    },
    include: {
      messages: {
        select: {
          id: true,
          content: true,
          sender: true,
        },
      },
    },
  });

  return newRoom;
}
