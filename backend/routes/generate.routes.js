import express from 'express';
import { generateScript } from '../controllers/generate.controller.js';

const router = express.Router();

router.post('/', generateScript);

export default router;
