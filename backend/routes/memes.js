import express from 'express';

import { getMemes, uploadMem } from '../controllers/memes.js';

//import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getMemes);
router.post('/upload', uploadMem);

export default router;