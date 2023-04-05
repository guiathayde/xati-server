import { Firebase } from './index';

export async function sendNotification(
  senderId: string,
  senderPhotoUrl: string,
  token: string,
  title: string,
  body: string,
) {
  const admin = Firebase.getInstance().admin;

  const message = {
    token,
    notification: {
      title,
      body,
    },
    data: {
      id: senderId,
      photoUrl: senderPhotoUrl,
    },
  };

  await admin.messaging().send(message);
}
