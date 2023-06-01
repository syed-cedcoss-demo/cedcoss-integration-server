import express from 'express';
import { connectForm, connectPlatform } from '../controllers/bigcommerceController.js';
import { auth } from '../middleware/tokenVerification.js';

const router = express.Router();

router.get('/connect-form', connectForm);
router.post('/connect-platform', auth, connectPlatform);

export default router;
