import { bigcommerceConnectForm } from '../../public/templates/form.js';
import currentProcessModel from '../models/currentProcess.js';
import userModel from '../models/userModel.js';
import { bigcommerceInstance } from '../services/request.js';
import { productImporter } from '../utils/bigCommImporter.js';
import appError from '../validations/appError.js';

// BIGCOMMERCE CONNECT FORM
export const connectForm = async (req, res) => {
  try {
    res.send(
      bigcommerceConnectForm(
        req?.token ??
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Nzg0YTJlMGM2MDM5ZTRlMjdiM2QwNiIsImlhdCI6MTY4NTYwNDkzMywiZXhwIjoxNjg1NjkxMzMzfQ.MKyn-BtdthkTjrCTtIUZt5FQxuDRbQKRQlnr6PXbd9o'
      )
    );
  } catch (error) {
    appError(res, error);
  }
};

// BIGCOMMERCE CONNECT SHOP
export const connectPlatform = async (req, res) => {
  try {
    const payload = {
      platform: 'bigcommerce',
      access_token: req?.body?.accessToken,
      store_hash: req?.body?.storeHash,
      client_id: req?.body?.clientId,
      client_secret: req?.body?.clientSecret
    };
    const user = await userModel.find({ _id: req.userId });
    if (user.length === 0) {
      return res
        .status(404)
        .send({ success: false, msg: 'user not found for given token', data: {} });
    }
    if (user[0].connected_platform.some((el) => el?.platform === payload?.platform)) {
      return res.status(409).send({
        success: false,
        msg: 'Already connected',
        data: {}
      });
    }
    await userModel.updateOne({ _id: req.userId }, { $push: { connected_platform: payload } });
    return res.status(200).send({
      success: true,
      msg: 'account successfully connected',
      data: {}
    });
  } catch (error) {
    appError(res, error);
  }
};

// BIGCOMMERCE PRODUCT IMPORT
export const productImport = async (req, res) => {
  try {
    const user = await userModel.find({ _id: req.userId });
    if (user.length === 0) {
      return res.status(401).send({
        success: false,
        msg: 'user not found for given token',
        data: {}
      });
    }
    const bigcom = user[0].connected_platform.find((el) => el.platform === 'bigcommerce');
    if (!bigcom) {
      return res.status(401).send({
        success: false,
        msg: 'bigcommerce not connected',
        data: {}
      });
    }
    const isImporting = await currentProcessModel.find({
      user_id: req.userId,
      platform: 'bigcommerce'
    });
    if (isImporting.length > 0) {
      return res.status(401).send({
        success: false,
        msg: 'importing in progress, please try again later',
        data: {}
      });
    }
    productImporter({ ...bigcom, id: user[0]._id });
    return res.status(200).send({
      success: true,
      msg: 'bigcommerce product import successfully started',
      data: {}
    });
  } catch (error) {
    appError(res, error);
  }
};

// CREATE WEBHOOK
export const createWebhook = async (req, res) => {
  try {
    const user = await userModel.find({ _id: req.userId });
    if (user.length === 0) {
      return res.status(401).send({
        success: false,
        msg: 'user not found for given token',
        data: {}
      });
    }
    const bigcom = user[0]?.connected_platform?.find((el) => el.platform === 'bigcommerce');
    if (!bigcom) {
      return res.status(401).send({
        success: false,
        msg: 'bigcommerce not connected',
        data: {}
      });
    }
    const response = await bigcommerceInstance.post(`${bigcom?.store_hash}/v3/hooks`, {
      headers: { 'Content-Type': 'application/json', 'X-Auth-Token': bigcom?.access_token },
      body: {
        scope: 'store/order/*',
        destination: 'https://c59d-103-97-184-122.ngrok-free.app/bigcommerce/create-webhook',
        is_active: true,
        events_history_enabled: true,
        headers: { custom: 'ced-demo-header' }
      }
    });
    console.log('data', response);
    return res.status(200).send({
      success: true,
      msg: 'webhook created successfully',
      data: response
    });
  } catch (error) {
    appError(res, error);
  }
};

// GET WEBHOOK
export const getWebhook = async (req, res) => {
  try {
    const user = await userModel.find({ _id: req.userId });
    console.log('user', user);
    if (user.length === 0) {
      return res.status(401).send({
        success: false,
        msg: 'user not found for given token',
        data: {}
      });
    }
    const bigcom = user[0]?.connected_platform?.find((el) => el.platform === 'bigcommerce');
    if (!bigcom) {
      return res.status(401).send({
        success: false,
        msg: 'bigcommerce not connected',
        data: {}
      });
    }
    const { data } = await bigcommerceInstance.get(`${bigcom?.store_hash}/v3/hooks`, {
      headers: { 'Content-Type': 'application/json', 'X-Auth-Token': bigcom?.access_token },
      body: {
        scope: 'store/order/*',
        destination: 'https://c59d-103-97-184-122.ngrok-free.app/bigcommerce/create-webhook',
        is_active: true,
        events_history_enabled: true,
        headers: { custom: 'ced-demo-header' }
      }
    });
    console.log('data', data);
    return res.status(200).send({
      success: true,
      msg: 'webhook successfully fetched',
      data
    });
  } catch (error) {
    appError(res, error);
  }
};

// GET WEBHOOK
export const orderCreated = async (req, res) => {
  try {
    console.log('req.body', req.body);
    console.log('req.query', req.query);
    console.log('req.param', req.param);
  } catch (error) {
    appError(res, error);
  }
};
