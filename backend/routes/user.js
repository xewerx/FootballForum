import express from 'express';

import { signin, seed, register, editProfile, uploadAvatar, getAvatar, likeOrUnlike, getLiveChatCredentials } from '../controllers/user.js';
import { isAuth } from '../middleware/auth.js';

//import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/seed', seed);
router.get('/avatar/:id', getAvatar);
router.get('/livechat-credentials', isAuth, getLiveChatCredentials);

router.post('/signin', signin);
router.post('/register', register);
router.post('/avatar', isAuth, uploadAvatar);

router.put('/edit', isAuth, editProfile);
router.put('/like/:id', isAuth, likeOrUnlike);

export default router;