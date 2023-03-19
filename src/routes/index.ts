import { Router } from 'express';

import usersRouter from './users';
import chatRoomsRouter from './chatRoom';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/chat-rooms', chatRoomsRouter);

export default routes;
