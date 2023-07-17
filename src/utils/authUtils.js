import 'dotenv/config';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import message from './message.js';

// sign email verification token
const signEmailVerificationToken = (handle, email) => jwt.sign({ handle, email }, process.env.JWT_SECRET, {
  expiresIn: '1d'
});

// sign access token
const signAccessToken = (id, handle, role = 'user', is_verified) => jwt.sign({ id, handle, role, is_verified }, process.env.JWT_SECRET_ACCESS, {
  expiresIn: '15min'
});

// sign refresh token
const signRefreshToken = handle => jwt.sign({ handle }, process.env.JWT_SECRET_REFRESH, {
  expiresIn: '7d'
});

// sign reset password token
const signResetPasswordToken = (id, handle, email) => jwt.sign({ id, handle, email }, process.env.JWT_SECRET, {
  expiresIn: '1d'
});

// send mail
const sendMail = async (email, token, job) => {
  const frontendURL = process.env.FRONTEND_URL;
  if (job === '' || job === null || job === undefined) {
    return;
  }
  let emailMessage;
  let subject;
  if (job === 'verification') {
    emailMessage = `<p>Click <a target="_blank" href="${ frontendURL }/verify/${ token }">here</a> to verify your account</p>`;
    subject = 'Verify your email';
  }
  if (job === 'rest') {
    emailMessage = `<p>Click <a target="_blank" href="${ frontendURL }/reset/${ token }">here</a> to reset your password</p>`;
    subject = 'Reset your password';
  }
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
    subject: `${ subject }`,
    html: `${ emailMessage }`
  };

  try {
    await transporter.sendMail(mailOptions);
    return message.success('Email sent');
  } catch (error) {
    throw new Error('Error sending email');
  }
};

export { signEmailVerificationToken, signAccessToken, signRefreshToken, sendMail, signResetPasswordToken };