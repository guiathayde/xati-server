import { Router } from 'express';

import { setReadMessageById } from '../models/Message/controllers/setReadMessageById';

const messagesRouter = Router();

messagesRouter.get('/read/:id', setReadMessageById);

export default messagesRouter;
