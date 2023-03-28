import { ChatRoom, User } from '@prisma/client';

import { io } from './http';

import { updateIsOnlineById } from './models/Users/services/updateIsOnlineById';
import { getChatRoomByUsersIds } from './models/ChatRoom/services/getChatRoomByUsersIds';
import { setReadMessagesByChatIdAndUserId } from './models/Message/services/setReadMessagesByChatIdAndUserId';
import { createChatRoomByUsersIds } from './models/ChatRoom/services/createChatRoomByUsersIds';
import { createMessageWithChatRoomId } from './models/Message/services/createMessageWithChatRoomId';
import { getChatRoomById } from './models/ChatRoom/services/getChatRoomById';
import { getCountMessagesUnreadByUserAndRoomId } from './models/Message/services/getCountMessagesUnreadByUserAndRoomId';
import { getUserById } from './models/Users/services/getUserById';

type Room =
  | (ChatRoom & {
      messages: {
        id: string;
        content: string;
        sender: User;
      }[];
    })
  | null;

io.on('connect', socket => {
  socket.on('updateIsOnline', async data => {
    const roomsIds = await updateIsOnlineById(data.userId, data.isOnline);

    io.to(roomsIds).emit('userToChatStatus', {
      userId: data.userId,
      isOnline: data.isOnline,
    });
  });

  socket.on('startChat', async (data, callback) => {
    let room: Room = null;

    room = await getChatRoomByUsersIds([data.userToChatId, data.userLoggedId]);

    if (room)
      await setReadMessagesByChatIdAndUserId(room.id, data.userLoggedId);
    else {
      room = await createChatRoomByUsersIds([
        data.userToChatId,
        data.userLoggedId,
      ]);

      const userToChat = await getUserById(data.userToChatId);

      if (userToChat && userToChat.socketId)
        io.to(userToChat.socketId).emit('newChat', {
          ...room,
          users: [userToChat],
          totalMessagesUnread: 0,
        });
    }

    socket.join(room.id);

    callback(room);
  });

  socket.on('message', async data => {
    const message = await createMessageWithChatRoomId(
      data.chatRoomId,
      data.senderId,
      data.content,
    );

    // Enviar a mensagem para outro usuário da sala
    io.to(data.chatRoomId).emit('message', message);

    // Enviar notificação para o usuário correto
    const room = await getChatRoomById(data.chatRoomId);

    if (room) {
      const receiverUser = room.users.find(
        user => String(user.id) !== String(data.senderId),
      );

      if (receiverUser && receiverUser.socketId) {
        const totalMessagesUnread = await getCountMessagesUnreadByUserAndRoomId(
          data.chatRoomId,
          receiverUser.id,
        );

        io.to(receiverUser.socketId).emit('updateChat', {
          ...room,
          totalMessagesUnread,
        });
      }
    }
  });

  socket.on('typing', async data => {
    io.to(data.chatRoomId).emit('typing', {
      senderId: data.senderId,
      content: data.content,
    });
  });
});
