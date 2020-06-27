import { Router } from 'express';

import * as handlers from './handlers';
import claveUnicaRoutes from './components/clave-unica/routes';

const router = Router();

router.get('/', handlers.home);

router.use(claveUnicaRoutes);

router.use(handlers.errorHandler);

export default router;
