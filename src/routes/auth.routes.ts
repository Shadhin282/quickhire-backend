import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';

const router = Router();

// user registration/login - role is defaulted to USER on register
router.post('/register', register);
router.post('/login', login);

export default router;
