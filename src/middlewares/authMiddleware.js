import jwt from 'jsonwebtoken';

// verify access token
const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {return res.sendStatus(401);}
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
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
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {return res.sendStatus(403);}
    req.user = user;
    next();
  }
  );
};

export { verifyAccessToken, verifyRefreshToken };