import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import models from '../models/index.js';
import message from '../utils/message.js';

class AuthController{
  // create user and send verification email
  addUser = async (req, res) => {
    try {
      const { handle, email } = req.body;
      let { password } = req.body;
      if (!handle || !password || !email) {
        return res.send(message.error('Please provide a handle, email and password'));
      }
      if (email) {
        // check if email is already verified in emails table
        const forEmail = await models.emails.findOne({ where: { email } });
        if (forEmail && forEmail.is_verified) {
          return res.send(message.error('You cannot register with this email'));
        }
      }
      password = await bcrypt.hash(password, 10);
      // generate jwt refresh and access token
      const refreshToken = jwt.sign({ handle }, process.env.JWT_SECRET_REFRESH, {
        expiresIn: '7d'
      });
      const accessToken = jwt.sign({ handle }, process.env.JWT_SECRET_ACCESS, {
        expiresIn: '15min'
      });

      const user = await models.users.create({ handle, password });

      // token for email verification only
      const token = jwt.sign({ handle, email }, process.env.JWT_SECRET, {
        expiresIn: '1d'
      });

      // send verification email
      this.sendMail(email, token);
      delete user.dataValues.password;

      if (user) {
        return res.send(message.success({
          user,
          accessToken,
          refreshToken
        }));
      }
      
    } catch (error) {
      return res.send(message.error(error.message));
    }
  };
  // send verification email to user
  sendMail = async (email, token) => {
    const port = process.env.PORT || 3000;
    // verify user using nodemailer and send verification link and jwt token
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      },
      authMethod: 'PLAIN'
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Verify your email',
      html: `<p>Click <a href="http://localhost:${ port }/auth/verify/${ token }">here</a> to verify your email</p>`
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent: ${ info.response }`);
      return message.success('Email sent');
    } catch (error) {
      console.log(error);
      throw new Error('Error sending email');
    }

  };
  // verify created user with email and insert in emails table
  // also set is_verified to true in users and emails table
  verifyUser = async (req, res) => {
    const { token } = req.params;
    // console.log(token);
    if (!token) {
      return res.send(message.error('Token not provided'));
    }
    try {
      // check token validity and verify user
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        return res.send(message.error('Invalid token'));
      }
      const { handle, email } = decoded;
      const user = await models.users.findOne({ where: { handle } });
      const forEmail = await models.emails.findOne({ where: { email } });
      if (forEmail && forEmail.is_verified) {
        return res.send(message.error('You cannot verify with this email'));
      }
      if (!forEmail) {
        await models.emails.create({ email, is_verified: true });
      }
      // verify user
      user.is_verified = true;
      await user.save();
      return res.send(message.success('User verified'));
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
      const user = await models.users.findOne({ where: { handle } });
      if (!user) {
        return res.send(message.error('User not found'));
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.send(message.error('Incorrect password'));
      }
      // generate jwt refresh and access token
      const refreshToken = jwt.sign({ handle }, process.env.JWT_SECRET_REFRESH, {
        expiresIn: '7d'
      });
      const accessToken = jwt.sign({ handle }, process.env.JWT_SECRET_ACCESS, {
        expiresIn: '15min'
      });
      delete user.dataValues.password;
      return res.send(message.success({
        user,
        accessToken,
        refreshToken
      }));
    } catch (error) {
      return res.send(message.error(error.message));
    }
  };
}

export default AuthController;
