import { DBClient } from '../../../services/DBClient';

export async function updateIsOnlineById(id: string, isOnline: boolean) {
  const prisma = DBClient.getInstance().prisma;

  const chatsRooms = await prisma.user.update({
    where: { id },
    data: { isOnline },
    select: {
      chatRooms: {
        select: {
          id: true,
        },
      },
    },
  });

  return chatsRooms.chatRooms.map(chatRoom => chatRoom.id);
}
