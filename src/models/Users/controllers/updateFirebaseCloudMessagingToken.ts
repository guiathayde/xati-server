import { Request, Response } from 'express';

import AppError from '../../../errors/AppError';

import { updateFirebaseMessagingTokenById } from '../services/updateFirebaseCloudMessagingTokenById';

export async function updateFirebaseCloudMessagingToken(
  request: Request,
  response: Response,
) {
  const { id, firebaseCloudMessagingToken } = request.body;

  if (!id || !firebaseCloudMessagingToken) {
    throw new AppError('Missing required fields', 400);
  }

  const user = await updateFirebaseMessagingTokenById(
    id,
    firebaseCloudMessagingToken,
  );

  return response.status(200).json(user);
}
