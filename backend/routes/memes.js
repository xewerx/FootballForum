import express from 'express';

import { getMemes } from '../controllers/memes.js';

//import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getMemes);

export default router;