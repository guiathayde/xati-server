import { DBClient } from '../../../services/DBClient';

export async function setReadMessageById(userId: string) {
  const prisma = DBClient.getInstance().prisma;

  try {
    await prisma.message.update({
      where: {
        id: userId,
      },
      data: {
        read: true,
      },
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
