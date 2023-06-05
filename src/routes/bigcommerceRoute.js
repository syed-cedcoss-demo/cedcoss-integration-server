import express from 'express';
import {
  connectForm,
  connectPlatform,
  createWebhook,
  getWebhook,
  orderCreated,
  productImport
} from '../controllers/bigcommerceController.js';
import { auth } from '../middleware/tokenVerification.js';

const router = express.Router();

router.get('/connect-form', connectForm);
router.post('/connect-platform', auth, connectPlatform);
router.get('/product-import', auth, productImport);
router.post('/create-webhook', auth, createWebhook);
router.get('/get-webhook', auth, getWebhook);
router.get('/order-created', auth, orderCreated);
router.post('/order-created', auth, orderCreated);
router.get('/payment-status', orderCreated);
router.post('/payment-status', orderCreated);

export default router;
