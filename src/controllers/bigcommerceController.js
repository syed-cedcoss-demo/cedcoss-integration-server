import { bigcommerceConnectForm } from '../../public/templates/form.js';
import currentProcessModel from '../models/currentProcess.js';
import userModel from '../models/userModel.js';
import { signForeverJWT } from '../services/jwt.js';
import { bigComGetCall, bigComPostCall } from '../services/request.js';
import { productImporter } from '../utils/bigCommImporter.js';
import appError from '../validations/appError.js';

// BIGCOMMERCE CONNECT FORM
export const connectForm = async (req, res) => {
  try {
    res.send(
      bigcommerceConnectForm(
        req?.token ??
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Nzg0YTJlMGM2MDM5ZTRlMjdiM2QwNiIsImlhdCI6MTY4NzE3MDI5MCwiZXhwIjoxNjg3MjU2NjkwfQ.yzjd6_zEgD4d9Lp8uTUkXCGyUdTLLwV1X1-yIvF8D_0'
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
        msg: 'Your BigCommerce store already connected',
        data: {}
      });
    }
    const platform = await userModel.find({
      connected_platform: { $elemMatch: { store_hash: { $eq: payload?.store_hash } } }
    });
    if (platform?.length > 0) {
      return res.status(409).send({
        success: false,
        msg: 'You can not connect same account with multiple user',
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
    if (!bigcom?.access_token) {
      return res.status(401).send({
        success: false,
        msg: 'bigcommerce not connected',
        data: {}
      });
    }

    const token = await signForeverJWT({ id: req?.userId });
    const { data } = await bigComPostCall({
      url: `stores/${bigcom?.store_hash}/v3/hooks`,
      body: JSON.stringify({
        scope: 'store/order/updated',
        destination:
          'https://b8f4-103-97-184-122.ngrok-free.app/bigcommerce/watch-order-status',
        is_active: true,
        events_history_enabled: true,
        headers: { Authorization: `Bearer  ${token}` }
      }),
      access_token: bigcom?.access_token
    });
    if (!data) {
      return res.status(404).send({
        success: true,
        msg: 'something went wrong',
        data: {}
      });
    } else {
      return res.status(200).send({
        success: true,
        msg: 'webhook created successfully',
        data
      });
    }
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
    const { data } = await bigComGetCall({
      url: `${bigcom?.store_hash}/v3/hooks`
    });
    return res.status(200).send({
      success: true,
      msg: 'webhook successfully fetched',
      data
    });
  } catch (error) {
    appError(res, error);
  }
};

// WEBHOOK WATCHER
export const orderStatus = async (req, res) => {
  try {
    console.log('req.body', req.body);
    console.log('req.query', req.query);
    console.log('req.param', req.param);
  } catch (error) {
    appError(res, error);
  }
};

export const productStatus = async (req, res) => {
  try {
    console.log('req.body', req.body);
    console.log('req.query', req.query);
    console.log('req.param', req.param);
  } catch (error) {
    appError(res, error);
  }
};
