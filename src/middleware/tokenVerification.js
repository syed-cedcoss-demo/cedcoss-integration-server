import { verifyJWT } from '../services/jwt.js';
import appError from '../validations/appError.js';
export const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.split(' ')?.[1];
    const isValid = await verifyJWT(token);
    if (isValid?.id) {
      req.userId = isValid.id;
      req.token = token;
      next();
    } else {
      appError(res, { message: 'token verification failed' });
    }
  } catch (error) {
    appError(res, error);
  }
};
