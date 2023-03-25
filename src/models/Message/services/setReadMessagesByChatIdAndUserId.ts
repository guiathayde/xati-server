import { DBClient } from '../../../services/DBClient';

export async function setReadMessagesByChatIdAndUserId(
  chatRoomId: string,
  userId: string,
) {
  const prisma = DBClient.getInstance().prisma;

  try {
    await prisma.message.updateMany({
      where: {
        chatRoomId,
        senderId: {
          not: userId,
        },
        read: false,
      },
      data: {
        read: true,
      },
    });
  } catch (error) {
    console.error(error);
  }
}
