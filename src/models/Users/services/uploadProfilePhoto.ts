import { uploadConfig } from '../../../config/uploadFile';

import { saveFile } from '../../../services/storage';
import { DBClient } from '../../../services/DBClient';

export async function uploadProfilePhoto(
  userId: string,
  requestFileName: string,
) {
  const { fileName, fileUrl } = await saveFile(
    uploadConfig.uploadsProfilePhotoFolder,
    requestFileName,
  );

  const prisma = DBClient.getInstance().prisma;

  const user = await prisma.user.update({
    where: { id: userId },
    data: { photoId: fileName, photoUrl: fileUrl },
  });

  return user;
}
