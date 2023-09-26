import { Request, Response } from 'express';

import { AppError } from '../errors/AppError';

import admin from '../services/firebase';

interface RequestBody {
  user?: {
    uid: string;
    displayName: string;
    photoURL: string;
    phoneNumber: string;
  };
  newMessage?: {
    userUid: string;
    text: string;
    createdAt: string;
  };
}

export async function sendNotification(request: Request, response: Response) {
  const { user, newMessage } = request.body as RequestBody;

  if (!user || !newMessage) {
    throw new AppError('Usuário ou mensagem vazia.', 403);
  }

  const userStatusDoc = await admin
    .firestore()
    .collection('usersStatus')
    .doc(user.uid)
    .get();

  if (userStatusDoc === null || !userStatusDoc.exists) {
    const userDoc = await admin
      .firestore()
      .collection('users')
      .doc(user.uid)
      .get();

    const fcmToken = userDoc.data()?.fcmToken;

    if (!fcmToken) {
      throw new AppError('FCM Token não encontrado.', 403);
    }

    await admin.messaging().send({
      token: fcmToken,
      notification: {
        title: user.displayName,
        body: newMessage.text,
        imageUrl: user.photoURL,
      },
    });
  }

  return response.send(200);
}
