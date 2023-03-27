import { Router } from 'express';

import { ensureAuthenticated } from '../middleware/ensureAuthenticated';

import { setReadMessageById } from '../models/Message/controllers/setReadMessageById';

const messagesRouter = Router();

messagesRouter.get('/read/:id', ensureAuthenticated, setReadMessageById);

export default messagesRouter;
