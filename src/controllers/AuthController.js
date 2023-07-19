import bcrypt from 'bcryptjs';
import md5 from 'md5';
import jwt from 'jsonwebtoken';
import models from '../models/index.js';
import message from '../utils/message.js';
import { Op,literal } from 'sequelize';
import { signEmailVerificationToken, signAccessToken, signRefreshToken, sendMail, signResetPasswordToken } from '../utils/authUtils.js';

class AuthController {
  // create user and send verification email
  addUser = async (req, res) => {
    try {
      const { handle, email } = req.body;
      let { password: passwordHash } = req.body;
      if (!handle || !passwordHash || !email) {
        return res.send(message.error('Please provide a handle, email and password'));
      }
      if (handle) {
        // check if handle is already taken
        const foundUser = await models.users.findOne({ where: { handle } });
        if (foundUser) {
          return res.send(message.error('Handle already taken'));
        }
      }
      let emailHash;
      if (email) {
        // check if email is already verified in emails table
        const foundEmail = await models.emails.findOne({ where: { email } });
        if (foundEmail && foundEmail.is_verified) {
          return res.send(message.error('You cannot register with this email'));
        }
        emailHash = md5(email);
        console.log('\n\n\n\n email hash: ', emailHash);
      }
      passwordHash = await bcrypt.hash(passwordHash, 10);
      // generate jwt refresh and access token
      const refreshToken = signRefreshToken(handle);
      
      const createdUser = await models.users.create({ handle, email_hash: emailHash, password: passwordHash });

      // token for email verification only
      const tokenForEmailVerification = signEmailVerificationToken(handle, email);

      // send verification email
      if (tokenForEmailVerification) {
        sendMail(email, tokenForEmailVerification, 'verification');
      }

      delete createdUser.dataValues.password;

      if (createdUser) {
        // send notification to user that email verification is pending
        await models.notifications.create({
          user_id: createdUser.id,
          message: 'Please verify your email to get full access'
        });
        return res.send(message.success({
          user: createdUser,
          refreshToken
        }));
      }

    } catch (error) {
      return res.send(message.error(error.message));
    }
  };

  // verify created user with email and insert in emails table
  resetVerification = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    if (!token) {
      return res.send(message.error('Token not provided'));
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        return res.send(message.error('Invalid token'));
      }
      const { handle, email } = decoded;
      const foundUser = await models.users.findOne({ where: { handle } });
      if (!foundUser) {
        return res.send(message.error('User not found with this handle'));
      }
      const foundEmail = await models.emails.findOne({ where: { email } });
      if(!foundEmail) {
        return res.send(message.error('You cannot rest password with this email'));
      }

      // check if email match to md5 hash in users table email_hash
      if (foundUser.email_hash !== md5(email)) {
        return res.send(message.error('Enter the email which was used to create this account'));
      }

      // verify user in users table
      if (foundUser.is_verified === false) {
        await models.users.update({ is_verified: true, updated_at: new Date() }, { where: { handle } });
      }
      
      // update password in users table
      const passwordHash = await bcrypt.hash(password, 10);
      await models.users.update({ password: passwordHash, updated_at: new Date() }, { where: { handle } });

      // now sign jwt refresh and access token
      const refreshToken = signRefreshToken(handle);
      const accessToken = signAccessToken(foundUser.dataValues.id, handle, foundUser.dataValues.role, foundUser.dataValues.is_verified);
      delete foundUser.dataValues.password;
      delete foundUser.dataValues.email_hash;
      return res.send(message.success({
        user: foundUser,
        accessToken,
        refreshToken
      }));
    }
    catch (error) {
      return res.send(message.error(error.message));
    }
  };
  // also set is_verified to true in users and emails table
  emailVerification = async (req, res) => {
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
      const foundEmail = await models.emails.findOne({ where: { email } });

      const foundUser = await models.users.findOne({ where: { handle } });

      if (!foundEmail) {
        return res.send(message.error('Something went wrong'));
      }
      if (foundEmail) {
        if (foundEmail.is_verified === true) {
          return res.send(message.error('Email already verified'));
        }
        await models.users.update({ is_verified: true, updated_at: new Date() }, { where: { handle } });
        // remove the notification from notifications table
        await models.notifications.destroy({ where: { user_id: foundUser.id } });
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

  // rest user detail verification
  
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
      const accessToken = signAccessToken(foundUser.dataValues.id, handle, foundUser.dataValues.role, foundUser.dataValues.is_verified);
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
    // get token from header refresh token
    const token = req.headers.refresh;
    if (!token) {
      return res.send(message.error('Token not provided'));
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_REFRESH);
      if (!decoded) {
        return res.send(message.error('Invalid token'));
      }
      const { handle } = decoded;
      const foundUser = await models.users.findOne({ where: { handle } });
      if (!foundUser) {
        return res.send(message.error('User not found'));
      }
      const accessToken = signAccessToken(foundUser.dataValues.id,handle, foundUser.dataValues.role, foundUser.dataValues.is_verified);
      return res.send(message.success({ accessToken }));
    } catch (error) {
      return res.send(error.message);
    }
  };

  // reset password
  resetPassword = async (req, res) => { 
    const { handle, email } = req.body;
    if (!handle || !email) {
      return res.send(message.error('Please provide a handle and email'));
    }
    try {
      const foundUser = await models.users.findOne({ where: { handle } });
      if (!foundUser) {
        return res.send(message.error('User not found'));
      }
      const foundEmail = await models.emails.findOne({ where: { email } });
      if (!foundEmail) {
        return res.send(message.error('Email not found'));
      }
      // check if email match to md5 hash in users table email_hash
      if (foundUser.email_hash !== md5(email)) {
        return res.send(message.error('Enter the email which was used to create this account'));
      }
      // generate token to send email for user
      const token = signResetPasswordToken(foundUser.id, handle, email);

      // send email verification link
      if (token) {
        if (sendMail(email, token, 'rest')) {
          res.send(message.success('Email sent'));
        } else {
          res.send(message.error('Something went wrong'));
        }
      }
    } catch (error) {
      res.send(message.error(error));
    }
  };

  // 
  // users controllers
  //

  // get all users
  getAllUsers = async (req, res) => {
    try {
      const users = await models.users.findAll({
        attributes: { exclude: ['password'] },
        order: [['created_at', 'DESC']]
      });
      return res.send(message.success(users));
    } catch (error) {
      return res.send(message.error(error.message));
    }
  };

  // get single user by handle
  getSingleUser = async (req, res) => { 
    const { handle } = req.params;
    if (!handle) {
      return res.send(message.error('Please provide an handle'));
    }
    try {
      const user = await models.users.findOne({ where: { handle } });
      delete user?.dataValues.password;      
      if (!user) {
        return res.send(message.success('User not available'));
      }

      // get total confession count
      const confessionCount = await models.confessions.count({ where: { user_id: user.id } });

      // get total comment count
      const commentCount = await models.comments.count({ where: { user_id: user.id } });

      // total no. of upvotes made by user
      const upvoteCount = await models.confessionVotes.count({ where: { vote_type: 'up', user_id: user.id } });

      // total no. of downvotes made by user
      const downvoteCount = await models.confessionVotes.count({ where: { vote_type: 'down', user_id: user.id } });

      // get highest voted confession of the user 
      const highestUpvotedConfession = await models.confessions.findOne({ where: { user_id: user.id }, order: [['upvote_count', 'DESC']] });
      
      // get highest viewed confession of user
      const highestViewedConfession = await models.confessions.findOne({
        where: { user_id: user.id },
        attributes: [
          'id',
          'title',
          'body',
          'user_id',
          'upvote_count',
          'is_approved',
          'downvote_count',
          'created_at',
          'updated_at',
          [literal('(SELECT COUNT(*) FROM views WHERE views.confession_id = confessions.id)'), 'view_count']
        ],
        order: [[literal('(SELECT COUNT(*) FROM views WHERE views.confession_id = confessions.id)'), 'DESC']]
      });

      // Get the total number of views made by other users for all confessions of the specific user
      const confessionViews = await models.views.count({
        where: {
          user_id: { [Op.ne]: user.id }
        },
        include: [
          {
            model: models.confessions,
            where: {
              user_id: user.id
            }
          }
        ]
      });

      // total views gained by all confessions of the user
      const totalViews = await models.views.count({
        include: [{ model: models.confessions, where: { user_id: user.id } }]
      });

      // lets arrange all data in a object
      const userData = {
        ...user.dataValues,
        confessionCount,
        commentCount,
        upvoteCount,
        downvoteCount,
        highestUpvotedConfession,
        highestViewedConfession,
        confessionViews,
        totalViews
      };

      return res.send(message.success(userData));
    }
    catch (error) {
      return res.send(message.error(error.message));
    }
  };

  // get logged in user
  getMe = async (req, res) => {
    if (!req.user) {
      return res.send(message.error('req user not found'));
    }
    const { id } = req.user;
    if (!id) {
      return res.send(message.error('Please provide a id'));
    }
    try {
      const user = await models.users.findOne({ where: { id } });
      delete user?.dataValues.password;

      // also count total no. of confessions made by user
      const confessionCount = await models.confessions.count({ where: { user_id: id } });
      // also count total no. of comments made by user
      const commentCount = await models.comments.count({ where: { user_id: id } });
      
      // also count total no. of upvotes made by user
      const upvoteCount = await models.confessionVotes.count({ where: { vote_type: 'up', user_id: id } });
      // also count total no. of downvotes made by user
      const downvoteCount = await models.confessionVotes.count({ where: { vote_type: 'down', user_id: id } });

      // Get highest upvoted confession of the user
      const highestUpvotedConfession = await models.confessions.findOne({
        where: { user_id: id },
        attributes: [
          'id',
          'title',
          'body',
          'user_id',
          'upvote_count',
          'is_approved',
          'downvote_count',
          'created_at',
          'updated_at'
        ],
        order: [['upvote_count', 'DESC']]
      });

      // Get highest viewed confession
      const highestViewedConfession = await models.confessions.findOne({
        where: { user_id: id },
        attributes: [
          'id',
          'title',
          'body',
          'user_id',
          'upvote_count',
          'is_approved',
          'downvote_count',
          'created_at',
          'updated_at',
          [literal('(SELECT COUNT(*) FROM views WHERE views.confession_id = confessions.id)'), 'view_count']
        ],
        order: [[literal('(SELECT COUNT(*) FROM views WHERE views.confession_id = confessions.id)'), 'DESC']]
      });

      // Get the total number of views made by other users for all confessions of the specific user
      const confessionViews = await models.views.count({
        where: {
          user_id: { [Op.ne]: id }
        },
        include: [
          {
            model: models.confessions,
            where: {
              user_id: id
            }
          }
        ]
      });

      // total views gained by all confessions of the user
      const totalViews = await models.views.count({
        include: [{ model: models.confessions, where: { user_id: id } }]
      });

      
      // lets arrange all data in a object
      const userData = {
        ...user.dataValues,
        confessionCount,
        commentCount,
        upvoteCount,
        downvoteCount,
        highestUpvotedConfession,
        highestViewedConfession,
        confessionViews,
        totalViews
      };


      return res.send(message.success(userData));
    }
    catch (error) {
      console.log(error);
      return res.send(message.error(error.message));
    }
  };
  
  // delete user by id
  deleteUser = async (req, res) => { 
    const { id } = req.params;
    // get handle from middleware user
    const { role } = req.user;
    if (!id) {
      return res.send(message.error('Please provide an id'));
    }
    if (role !== 'admin') {
      return res.send(message.error('You are not authorized'));
    }
    try {
      const deletedUser = await models.users.destroy({ where: { id } });
      return res.send(message.success(deletedUser));
    }
    catch (error) {
      return res.send(message.error(error.message));
    }
  };

  // upgrade user to admin
  upgradeToAdmin = async (req, res) => {
    const { id } = req.params;
    // get role from middleware user
    const { role } = req.user;
    if (!id) {
      return res.send(message.error('Please provide an id'));
    }
    if (role !== 'admin') {
      return res.send(message.error('You are not authorized'));
    }
    try {
      const updatedUser = await models.users.update({ role: 'admin', updated_at: new Date() }, { where: { id } });
      return res.send(message.success(updatedUser));
    }
    catch (error) {
      return res.send(message.error(error.message));
    }
  };
}

export default AuthController;
