import { Request, Response } from 'express';

import AppError from '../../../errors/AppError';

import { uploadProfilePhoto as uploadProfilePhotoService } from '../services/uploadProfilePhoto';

export async function uploadProfilePhoto(request: Request, response: Response) {
  const { id } = request.body;

  if (!id) throw new AppError('User id is required', 400);
  if (!request.file) throw new AppError('No file uploaded', 400);

  try {
    const user = await uploadProfilePhotoService(id, request.file.filename);

    return response.json(user);
  } catch (error) {
    throw new AppError(JSON.stringify(error), 500);
  }
}
