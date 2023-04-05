import { DBClient } from '../../../services/DBClient';

export async function createOrUpdateUser(
  phoneNumber: string,
  id?: string,
  socketId?: string,
  email?: string,
  name?: string,
  firebaseCloudMessagingToken?: string,
) {
  const prisma = DBClient.getInstance().prisma;

  const user = await prisma.user.upsert({
    where: { phoneNumber },
    update: { id, socketId, name, email, firebaseCloudMessagingToken },
    create: {
      id,
      socketId,
      name,
      email,
      phoneNumber,
      firebaseCloudMessagingToken,
    },
  });

  return user;
}
