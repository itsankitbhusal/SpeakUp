import { verifyAccessToken, verifyRefreshToken } from './authMiddleware.js';

const middlewares = {
  verifyAccessToken,
  verifyRefreshToken
};

export default middlewares;