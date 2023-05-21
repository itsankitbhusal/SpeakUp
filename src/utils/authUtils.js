import 'dotenv/config';
import  jwt  from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import message from './message.js';

// sign email verification token
const signEmailVerificationToken = (handle, email) => jwt.sign({ handle, email }, process.env.JWT_SECRET, {
  expiresIn: '1d'
});

// sign access token
const signAccessToken = (id, handle, role='user') => jwt.sign({ id, handle, role }, process.env.JWT_SECRET_ACCESS, {
  expiresIn: '7d'
});

// sign refresh token
const signRefreshToken = handle => jwt.sign({ handle }, process.env.JWT_SECRET_REFRESH, {
  expiresIn: '7d'
});

// send mail
const sendMail = async(email, token) => {
  const port = process.env.PORT || 3000;
  const host = process.env.URL || 'http://localhost';
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
    html: `<p>Click <a href="${ host }:${ port }/auth/verify/${ token }">here</a> to verify your email</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    return message.success('Email sent');
  } catch (error) {
    throw new Error('Error sending email');
  }

};

export { signEmailVerificationToken, signAccessToken, signRefreshToken, sendMail };