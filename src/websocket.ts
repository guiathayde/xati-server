import { ChatRoom, User } from '@prisma/client';

import { io } from './http';

import { getChatRoomByUsersIds } from './controller/ChatRoom/getChatRoomByUsersIds';
import { createChatRoomByUsersIds } from './controller/ChatRoom/createChatRoomByUsersIds';
import { createMessageWithChatRoomId } from './controller/Message/createMessageWithChatRoomId';
import { getChatRoomById } from './controller/ChatRoom/getChatRoomById';

type Room =
  | (ChatRoom & {
      messages: {
        id: string;
        content: string;
        sender: User;
      }[];
    })
  | null;

io.on('connect', (socket) => {
  socket.on('startChat', async (data, callback) => {
    let room: Room = null;
    room = await getChatRoomByUsersIds([data.userToChatId, data.userLoggedId]);
    if (!room) {
      room = await createChatRoomByUsersIds([
        data.userToChatId,
        data.userLoggedId,
      ]);

      io.to(data.userToChatId).emit('newChat', room);
    }

    socket.join(room.id);

    callback(room);
  });

  socket.on('message', async (data) => {
    const message = await createMessageWithChatRoomId(
      data.chatRoomId,
      data.senderId,
      data.content
    );

    // Enviar a mensagem para outro usuário da sala
    io.to(data.chatRoomId).emit('message', message);

    // Enviar notificação para o usuário correto
    const room = await getChatRoomById(data.chatRoomId);

    if (room) {
      const receiverUser = room.users.find(
        (user) => String(user.id) !== String(data.senderId)
      );
      const senderUser = room.users.find(
        (user) => String(user.id) === String(data.senderId)
      );

      if (receiverUser && receiverUser.socketId)
        io.to(receiverUser.socketId).emit('notification', {
          newMessage: true,
          chatRoomId: data.chatRoomId,
          sender: senderUser,
        });
    }
  });
});
