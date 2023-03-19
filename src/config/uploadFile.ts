import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

const tmpFolder = path.resolve(__dirname, '..', 'tmp');

interface IUploadConfig {
  driver: string;

  tmpFolder: string;
  uploadsFolder: string;
  uploadsProfilePhotoFolder: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    disk: {};
  };
}

export const uploadConfig = {
  driver: 'disk',

  tmpFolder,
  uploadsFolder: path.resolve(__dirname, '..', 'files'),
  uploadsProfilePhotoFolder: 'profiles',

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileType = file.mimetype.split('/')[1];
        const fileHashName = `${crypto
          .randomBytes(10)
          .toString('hex')}.${fileType}`;

        return callback(null, fileHashName);
      },
    }),
  },

  config: {
    disk: {},
  },
} as IUploadConfig;
