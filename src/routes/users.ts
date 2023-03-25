import { Router } from 'express';
import multer from 'multer';

import { uploadConfig } from '../config/uploadFile';

import { createOrUpdateUser } from '../models/Users/controllers/createOrUpdateUser';
import { uploadProfilePhoto } from '../models/Users/controllers/uploadProfilePhoto';
import { getUserById } from '../models/Users/controllers/getUserById';
import { getUserByPhoneNumber } from '../models/Users/controllers/getUserByPhoneNumber';

const usersRouter = Router();

const upload = multer(uploadConfig.multer);

usersRouter.post('/create-or-update', createOrUpdateUser);
usersRouter.post(
  '/upload-profile-photo',
  upload.single('photo'),
  uploadProfilePhoto,
);
usersRouter.get('/phone/:phoneNumber', getUserByPhoneNumber);
usersRouter.get('/:id', getUserById);

export default usersRouter;
