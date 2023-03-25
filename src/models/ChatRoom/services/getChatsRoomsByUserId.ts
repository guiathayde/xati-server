import { DBClient } from '../../../services/DBClient';

export async function getChatsRoomsByUserId(userId: string) {
  const prisma = DBClient.getInstance().prisma;

  try {
    const rooms = await prisma.chatRoom.findMany({
      where: {
        users: {
          some: {
            id: {
              in: userId,
            },
          },
        },
      },
      select: {
        id: true,
        users: {
          where: {
            id: {
              notIn: userId,
            },
          },
        },
        messages: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    });

    const chats = await Promise.all(
      rooms.map(async room => {
        const totalMessagesUnread = await prisma.message.count({
          where: {
            chatRoomId: room.id,
            senderId: {
              not: userId,
            },
            read: false,
          },
        });

        return {
          ...room,
          totalMessagesUnread,
        };
      }),
    );

    return chats;
  } catch (error) {
    console.error(error);
    return [];
  }
}
