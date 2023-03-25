import { DBClient } from '../../../services/DBClient';

export async function createMessageWithChatRoomId(
  chatRoomId: string,
  senderId: string,
  content: string
) {
  const prisma = DBClient.getInstance().prisma;

  const message = await prisma.message.create({
    data: {
      chatRoomId,
      senderId,
      content,
    },
    select: {
      id: true,
      content: true,
      sender: true,
    },
  });

  return message;
}
