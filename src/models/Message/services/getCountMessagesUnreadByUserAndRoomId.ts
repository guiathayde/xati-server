import { DBClient } from '../../../services/DBClient';

export async function getCountMessagesUnreadByUserAndRoomId(
  chatRoomId: string,
  userId: string,
) {
  const prisma = DBClient.getInstance().prisma;

  const totalMessagesUnread = await prisma.message.count({
    where: {
      chatRoomId,
      senderId: {
        not: userId,
      },
      read: false,
    },
  });

  return totalMessagesUnread;
}
