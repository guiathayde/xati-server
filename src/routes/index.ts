import { Router } from 'express';

import usersRouter from './users';
import chatRoomsRouter from './chatRoom';
import messagesRouter from './messages';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/chat-rooms', chatRoomsRouter);
routes.use('/messages', messagesRouter);

export default routes;
