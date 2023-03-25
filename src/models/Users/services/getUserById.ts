import { DBClient } from '../../../services/DBClient';

export async function getUserById(id: string) {
  const prisma = DBClient.getInstance().prisma;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user;
  } catch (error) {
    return null;
  }
}
