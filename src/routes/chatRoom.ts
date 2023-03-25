import { Router } from 'express';

import { getChatsByUserId } from '../models/ChatRoom/controllers/getChatsByUserId';

const chatRoomsRouter = Router();

chatRoomsRouter.get('/user/:id', getChatsByUserId);

export default chatRoomsRouter;
