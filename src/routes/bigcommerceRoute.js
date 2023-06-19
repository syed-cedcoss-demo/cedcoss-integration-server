import express from 'express';
import {
  connectForm,
  connectPlatform,
  createWebhook,
  getWebhook,
  orderStatus,
  productImport,
  productStatus
} from '../controllers/bigcommerceController.js';
import { auth } from '../middleware/authorization.js';

const router = express.Router();

// render connect platform form
router.get('/connect-form', connectForm);
// connect platform
router.post('/connect-platform', auth, connectPlatform);

// import product
router.get('/product-import', auth, productImport);

// webhooks
router.post('/create-webhook', auth, createWebhook);
router.get('/get-webhook', auth, getWebhook);
router.post('/watch-order-status', orderStatus);
router.get('/watch-product-status', auth, productStatus);

export default router;
