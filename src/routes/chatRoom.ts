import { Router } from 'express';

import { ensureAuthenticated } from '../middleware/ensureAuthenticated';

import { getChatsByUserId } from '../models/ChatRoom/controllers/getChatsByUserId';

const chatRoomsRouter = Router();

chatRoomsRouter.get('/user/:id', ensureAuthenticated, getChatsByUserId);

export default chatRoomsRouter;
