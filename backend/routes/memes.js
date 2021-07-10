import express from 'express';

import { getMemes, uploadMem } from '../controllers/memes.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getMemes);
router.post('/upload', isAuth,uploadMem);

export default router;