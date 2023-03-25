-- DropIndex
DROP INDEX "Message_chatRoomId_key";

-- DropIndex
DROP INDEX "Message_senderId_key";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "read" BOOLEAN NOT NULL DEFAULT false;
