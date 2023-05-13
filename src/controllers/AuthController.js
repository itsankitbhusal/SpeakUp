import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import models from '../models/index.js';
import message from '../utils/message.js';
import { signEmailVerificationToken, signAccessToken, signRefreshToken, sendMail } from '../utils/authUtils.js';

class AuthController {
  // create user and send verification email
  addUser = async (req, res) => {
    try {
      const { handle, email } = req.body;
      let { password: passwordHash } = req.body;
      if (!handle || !passwordHash || !email) {
        return res.send(message.error('Please provide a handle, email and password'));
      }
      if (email) {
        // check if email is already verified in emails table
        const foundEmail = await models.emails.findOne({ where: { email } });
        if (foundEmail && foundEmail.is_verified) {
          return res.send(message.error('You cannot register with this email'));
        }
      }
      passwordHash = await bcrypt.hash(passwordHash, 10);
      // generate jwt refresh and access token
      const refreshToken = signRefreshToken(handle);
      const accessToken = signAccessToken(handle);

      const createdUser = await models.users.create({ handle, password: passwordHash });

      // token for email verification only
      const tokenForEmailVerification = signEmailVerificationToken(handle, email);

      // send verification email
      sendMail(email, tokenForEmailVerification);

      delete createdUser.dataValues.password;

      if (createdUser) {
        return res.send(message.success({
          user: createdUser,
          accessToken,
          refreshToken
        }));
      }

    } catch (error) {
      return res.send(message.error(error.message));
    }
  };

  // verify created user with email and insert in emails table
  // also set is_verified to true in users and emails table
  emailVerification = async (req, res) => {
    const { token } = req.params;
    // console.log(token);
    if (!token) {
      return res.send(message.error('Token not provided'));
    }
    // update user in users table if email is verified
    const updateUser = async handle => {
      // verify user in users table
      await models.users.update({ is_verified: true }, { where: { handle } });
      return message.success('User verified');
    };
    try {
      // check token validity and verify user
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        return res.send(message.error('Invalid token'));
      }
      const { handle, email } = decoded;
      const foundEmail = await models.emails.findOne({ where: { email } });

      if (!foundEmail) {
        await models.emails.create({ email, is_verified: true });
        await updateUser(handle);
        return res.send(message.success('User verified'));
      }
      else if (foundEmail && !foundEmail.is_verified) {
        await models.emails.update({ is_verified: true }, { where: { email } });
        await updateUser(handle);
        return res.send(message.success('User verified'));
      }
      else {
        return res.send(message.error('You cannot verify with this email'));
      }
    }
    catch (error) {
      return res.send(message.error(error.message));
    }
  };
  // check user login and return jwt refresh and access token
  loginUser = async (req, res) => {
    const { handle, password } = req.body;
    if (!handle || !password) {
      return res.send(message.error('Please provide a handle and password'));
    }
    try {
      const foundUser = await models.users.findOne({ where: { handle } });
      if (!foundUser) {
        return res.send(message.error('User not found'));
      }
      const isPasswordMatched = await bcrypt.compare(password, foundUser.password);
      if (!isPasswordMatched) {
        return res.send(message.error('Incorrect password'));
      }
      // generate jwt refresh and access token
      const refreshToken = signRefreshToken(handle);
      const accessToken = signAccessToken(handle);
      delete foundUser.dataValues.password;
      return res.send(message.success({
        user: foundUser,
        accessToken,
        refreshToken
      }));
    } catch (error) {
      return res.send(message.error(error.message));
    }
  };

  // get new access token using refresh token
  getNewAccessToken = async (req, res) => { 
    const { token } = req.body;
    if (!token) {
      return res.send(message.error('Token not provided'));
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_REFRESH);
      if (!decoded) {
        return res.send(message.error('Invalid token'));
      }
      const { handle } = decoded;
      const accessToken = signAccessToken(handle);
      return res.send(message.success({ accessToken }));
    } catch (error) {
      return res.send(error.message);
    }
  };
}

export default AuthController;
