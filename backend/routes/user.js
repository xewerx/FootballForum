import express from 'express';

import { signin, seed } from '../controllers/user.js';

//import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/seed', seed);
router.post('/signin', signin);

export default router;