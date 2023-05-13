import jwt from 'jsonwebtoken';
import 'dotenv/config';

// verify access token
const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {return res.sendStatus(401);}
  jwt.verify(token, process.env.JWT_SECRET_ACCESS, (err, user) => {
    if (err) {return res.sendStatus(403);}
    req.user = user;
    next();
  }
  );
};

// verify refresh token
const verifyRefreshToken = (req, res, next) => {
  const refreshToken = req.body.token;
  if (!refreshToken) {return res.sendStatus(401);}
  jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH, (err, user) => {
    if (err) {return res.sendStatus(403);}
    req.user = user;
    next();
  }
  );
};

export { verifyAccessToken, verifyRefreshToken };