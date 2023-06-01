import { bigcommerceConnectForm } from '../../public/templates/form.js';
import userModel from '../models/userModel.js';
import appError from '../validations/appError.js';

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
export const connectPlatform = async (req, res) => {
  try {
    const payload = req.body;
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
    await userModel.updateOne(
      { _id: req.userId },
      { $push: { connected_platform: { ...payload } } }
    );
    return res.status(200).send({
      success: true,
      msg: 'account successfully connected',
      data: {}
    });
  } catch (error) {
    appError(res, error);
  }
};
