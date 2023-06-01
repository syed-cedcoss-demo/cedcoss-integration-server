import express from 'express';
import {
  connectForm,
  connectPlatform,
  productImport
} from '../controllers/bigcommerceController.js';
import { auth } from '../middleware/tokenVerification.js';

const router = express.Router();

router.get('/connect-form', connectForm);
router.post('/connect-platform', auth, connectPlatform);
router.get('/product-import', auth, productImport);

export default router;
