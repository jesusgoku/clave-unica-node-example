import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import * as handlers from './handlers';
import * as middleware from './middleware';

const routes = Router();

routes.get('/login', handlers.login);
routes.get('/logout', handlers.logout);
routes.get('/callback/claveunica', asyncHandler(handlers.callback));

routes.get('/me', middleware.isAuth, asyncHandler(handlers.me));

export default routes;
