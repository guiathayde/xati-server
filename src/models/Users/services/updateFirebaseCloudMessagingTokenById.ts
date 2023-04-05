import { DBClient } from '../../../services/DBClient';

export async function updateFirebaseMessagingTokenById(
  id: string,
  firebaseCloudMessagingToken: string,
) {
  const prisma = DBClient.getInstance().prisma;

  const user = await prisma.user.update({
    where: { id },
    data: { firebaseCloudMessagingToken },
  });

  return user;
}
