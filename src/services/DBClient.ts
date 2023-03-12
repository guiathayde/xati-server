import { PrismaClient } from '@prisma/client';

export class DBClient {
  public prisma: PrismaClient;
  private static instance: DBClient;

  private constructor() {
    this.prisma = new PrismaClient();
  }

  public static getInstance = () => {
    if (!DBClient.instance) {
      DBClient.instance = new DBClient();
    }
    return DBClient.instance;
  };
}
