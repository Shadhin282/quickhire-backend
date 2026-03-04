import { Router } from 'express';
import { createApplication } from '../controllers/applications.controller';

const router = Router();

router.post('/', createApplication);

export default router;
