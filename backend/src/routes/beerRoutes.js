
import express from 'express';

import { list } from '../controllers/beerController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/', auth, list);

export default router;
