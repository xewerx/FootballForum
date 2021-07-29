import express from 'express';

import { getMemes, uploadMem, acceptMem, discardMem, getMemesToAcceptation, deleteMem } from '../controllers/memes.js';
import { isAuth, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getMemes);
router.get('/toaccept', isAuth, isAdmin, getMemesToAcceptation);

router.post('/upload', isAuth, uploadMem);

router.put('/acceptmem', isAuth, isAdmin, acceptMem);
router.put('/discardmem', isAuth, isAdmin, discardMem);

router.delete('/delete/:id', isAuth, isAdmin, deleteMem);

export default router;