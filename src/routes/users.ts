import { Router } from 'express';
import multer from 'multer';

import { uploadConfig } from '../config/uploadFile';

import { createOrUpdateUser } from '../controller/Users/createOrUpdate';
import { uploadProfilePhoto } from '../controller/Users/uploadProfilePhoto';
import { getUserById } from '../controller/Users/getUserById';
import { getUserByPhoneNumber } from '../controller/Users/getUserByPhoneNumber';

const usersRouter = Router();

const upload = multer(uploadConfig.multer);

usersRouter.post('/create-or-update', createOrUpdateUser);
usersRouter.post(
  '/upload-profile-photo',
  upload.single('photo'),
  uploadProfilePhoto
);
usersRouter.get('/phone/:phoneNumber', getUserByPhoneNumber);
usersRouter.get('/:id', getUserById);

export default usersRouter;
