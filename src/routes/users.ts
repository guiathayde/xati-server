import { Router } from 'express';

import { create } from '../controller/Users/create';

const usersRouter = Router();

usersRouter.post('/create', create);

export default usersRouter;
