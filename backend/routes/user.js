import express from 'express';

import { signin, seed, register, editProfile, uploadAvatar, getAvatar, like } from '../controllers/user.js';
import { isAuth } from '../middleware/auth.js';

//import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/seed', seed);
router.get('/avatar/:id', getAvatar);

router.post('/signin', signin);
router.post('/register', register);
router.post('/avatar', isAuth, uploadAvatar);

router.put('/edit', isAuth, editProfile);
router.put('/like/:id', isAuth, like);


export default router;