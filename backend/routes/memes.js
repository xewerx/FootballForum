import express from 'express';

import { getMemes, uploadMem, acceptMem, discardMem, getMemesToAcceptation } from '../controllers/memes.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getMemes);
router.get('/toaccept', isAuth, getMemesToAcceptation);

router.post('/upload', isAuth, uploadMem);
router.post('/acceptmem', isAuth, acceptMem);
router.post('/discardmem', isAuth, discardMem);


export default router;