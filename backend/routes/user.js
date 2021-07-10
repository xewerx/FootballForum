import express from 'express';

import { signin, seed, register } from '../controllers/user.js';

//import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/seed', seed);
router.post('/signin', signin);
router.post('/register', register);

export default router;