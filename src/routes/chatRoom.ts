import { Router } from 'express';

import { getChatRoomByUserId } from '../controller/ChatRoom/getChatRoomByUserId';

const chatRoomsRouter = Router();

chatRoomsRouter.get('/user/:id', getChatRoomByUserId);

export default chatRoomsRouter;
