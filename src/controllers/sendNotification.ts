import { Request, Response } from 'express';

import { AppError } from '../errors/AppError';

import admin from '../services/firebase';

interface RequestBody {
  chatId?: string;
  from?: string; // user uid
  to?: string; // user uid
  newMessage?: {
    userUid: string;
    text: string;
    createdAt: string;
  };
}

export async function sendNotification(request: Request, response: Response) {
  const { chatId, from, to, newMessage } = request.body as RequestBody;

  if (!chatId || !from || !to || !newMessage) {
    throw new AppError('Chat ID, usuários ou mensagem vazia.', 403);
  }

  const userStatusDoc = await admin
    .firestore()
    .collection('usersStatus')
    .doc(to)
    .get();

  if (!userStatusDoc || !userStatusDoc.exists) {
    const toUserDoc = await admin.firestore().collection('users').doc(to).get();

    const fcmToken = toUserDoc.data()?.fcmToken;

    if (!fcmToken) {
      throw new AppError('FCM Token não encontrado.', 403);
    }

    const os = toUserDoc.data()?.os;

    const fromUserDoc = await admin
      .firestore()
      .collection('users')
      .doc(from)
      .get();

    const userUid = fromUserDoc.id;
    const displayName =
      fromUserDoc.data()?.displayName ?? fromUserDoc.data()?.phoneNumber;
    const photoURL = fromUserDoc.data()?.photoURL ?? '';
    const phoneNumber = fromUserDoc.data()?.phoneNumber;

    if (!userUid || !displayName) {
      throw new AppError('Usuário não encontrado.', 403);
    }

    // APNS not configured, is necessary Apple Developer Account
    if (os !== 'ios') {
      console.log('Sending notification...');
      const response = await admin.messaging().send({
        token: fcmToken,
        data: {
          chatId,
          userUid,
          displayName,
          photoURL,
          phoneNumber,
          messageText: newMessage.text,
          messageCreatedAt: newMessage.createdAt,
        },
        android: {
          priority: 'high',
        },
      });
      console.log('Successfully sent message:', response);
    }
  }

  return response.sendStatus(200);
}
