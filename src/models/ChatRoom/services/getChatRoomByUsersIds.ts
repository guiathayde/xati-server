import { DBClient } from '../../../services/DBClient';

export async function getChatRoomByUsersIds(idUsers: string[]) {
  const prisma = DBClient.getInstance().prisma;

  const room = await prisma.chatRoom.findFirst({
    where: {
      users: {
        every: {
          id: {
            in: idUsers,
          },
        },
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

  return room;
}
