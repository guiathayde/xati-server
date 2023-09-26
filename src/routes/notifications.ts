import { Router } from 'express';

import { ensureAuthenticated } from '../middleware/ensureAuthenticated';

import { sendNotification } from '../controllers/sendNotification';

const notificationsRouter = Router();

notificationsRouter.post('/', ensureAuthenticated, sendNotification);

export default notificationsRouter;
