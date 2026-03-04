import { Router } from 'express';
import { getJobs, getJobById, createJob, deleteJob } from '../controllers/jobs.controller';
import { authMiddleware, requireAdmin } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getJobs);
router.get('/:id', getJobById);
// only authenticated admin may create or delete
router.post('/', authMiddleware, requireAdmin, createJob);
router.delete('/:id', authMiddleware, requireAdmin, deleteJob);

export default router;
