import express from 'express';

import { signin, seed, register, editProfile } from '../controllers/user.js';
import { isAuth } from '../middleware/auth.js';

//import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/seed', seed);
router.post('/signin', signin);
router.post('/register', register);
router.post('/edit', isAuth, editProfile);

export default router;