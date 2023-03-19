import fs from 'fs';
import path from 'path';
import { uploadConfig } from '../../config/uploadFile';

interface SaveFileResponse {
  fileName: string;
  fileUrl: string;
}

export async function saveFile(
  folder: string,
  fileName: string
): Promise<SaveFileResponse> {
  await fs.promises.rename(
    path.resolve(uploadConfig.tmpFolder, fileName),
    path.resolve(uploadConfig.uploadsFolder, folder, fileName)
  );

  const fileUrl = `${process.env.API_URL}/files/${folder}/${fileName}`;

  return {
    fileName,
    fileUrl,
  };
}

export async function deleteFile(folder: string, file: string): Promise<void> {
  const filePath = path.resolve(uploadConfig.uploadsFolder, folder, file);

  try {
    await fs.promises.stat(filePath);
  } catch {
    return;
  }

  await fs.promises.unlink(filePath);
}
