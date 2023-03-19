import { Request, Response } from 'express';

import { uploadConfig } from '../../config/uploadFile';

import AppError from '../../errors/AppError';

import { saveFile } from '../../services/storage';
import { DBClient } from '../../services/DBClient';

export async function uploadProfilePhoto(request: Request, response: Response) {
  const { id } = request.body;

  if (!request.file) throw new AppError('No file uploaded', 400);

  const { fileName, fileUrl } = await saveFile(
    uploadConfig.uploadsProfilePhotoFolder,
    request.file.filename
  );

  const prisma = DBClient.getInstance().prisma;

  const user = await prisma.user.update({
    where: { id },
    data: { photoId: fileName, photoUrl: fileUrl },
  });

  return response.json(user);
}
