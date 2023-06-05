import jwt from 'jsonwebtoken';

// REGULAR JWT SIGN
export const signJWT = async (payload, time = '24h') => {
  return await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: time
  });
};

// REGULAR JWT VERIFY
export const verifyJWT = async (token) => {
  return await jwt.verify(token, process.env.JWT_SECRET);
};

//  JWT SIGN WITH NO EXPIRATION DATE
export const signForeverJWT = async (payload) => {
  return await jwt.sign(payload, process.env.JWT_SECRET);
};
