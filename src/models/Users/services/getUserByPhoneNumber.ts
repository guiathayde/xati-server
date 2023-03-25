import { DBClient } from '../../../services/DBClient';

export async function getUserByPhoneNumber(phoneNumber: string) {
  const prisma = DBClient.getInstance().prisma;

  try {
    const user = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}
