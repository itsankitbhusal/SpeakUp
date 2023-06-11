import models from '../models/index.js';
import { message } from '../utils/index.js';

class ConfessionVoteController{
  // create a confession vote
  createConfessionUpVote = async (req, res) => { 
    const { id: confessionId } = req.params;
    const voteType = 'up';
    //   get user id from the access token 
    const { id:userId } = req.user;
    if (!confessionId ) {
      return res.send(message.error('Please provide confession id'));
    }
    try {
      const confessionVote = await models.confessionVotes.findOne({
        where: {
          user_id: userId,
          confession_id: confessionId
        }
      });
      if (confessionVote) {
        return res.send(message.error('You have already voted for this confession.'));
      }
      const newConfessionVote = await models.confessionVotes.create({
        user_id: userId,
        confession_id: confessionId,
        vote_type: voteType
      });
      if (newConfessionVote) {
        const result = await this.updateConfessionVoteCount(confessionId, voteType);
        if (result === 'success') {
          return res.send(message.success('Confession vote created successfully.'));
        }
        return res.send(message.error('Something went wrong.'));
      }
    }
    catch (error) {
      return res.send(message.error(error.message));
    }
  };
    
  // create a confession down vote
  createConfessionDownVote = async (req, res) => { 
    const { id: confessionId } = req.params;
    const voteType = 'down';
    //   get user id from the access token
    const { id: userId } = req.user;
    
    if (!confessionId ) {
      return res.send(message.error('Please provide all the required fields.'));
    }
    try {
      const confessionVote = await models.confessionVotes.findOne({
        where: {
          user_id: userId,
          confession_id: confessionId
        }
      });
      if (confessionVote) {
        return res.send(message.error('You have already voted for this confession.'));
      }
      const newConfessionVote = await models.confessionVotes.create({
        user_id: userId,
        confession_id: confessionId,
        vote_type: voteType
      });
      if (newConfessionVote) {
        const result = await this.updateConfessionVoteCount(confessionId, voteType);
        if (result === 'success') {
          return res.send(message.success('Confession vote created successfully.'));
        }
        return res.send(message.error('Something went wrong.'));
      }
    }
    catch (error) {
      return res.send(message.error(error.message));
    }
  };
  // update a confession up vote
  updateConfessionUpVote = async (req, res) => {
    const { id: confessionId } = req.params;
    const voteType = 'up';
    //   get user id from the access token 
    const { id:userId } = req.user;
    if (!confessionId || !voteType) {
      return res.send(message.error('Please provide all the required fields.'));
    }
    try {
      const confessionVote = await models.confessionVotes.findOne({
        where: { user_id: userId, confession_id: confessionId }
      });
      // check if up vote already exists
      if (confessionVote.vote_type === voteType) {
        return res.send(message.error('You have already up voted for this confession.'));
      }
      if (!confessionVote) {
        return res.send(message.error('You have not voted for this confession.'));
      }
      const updatedConfessionVote = await models.confessionVotes.update({
        vote_type: voteType
      }, {
        where: { user_id: userId, confession_id: confessionId }
      });
      if (updatedConfessionVote) {
        const result = await this.updateConfessionVoteCountOnUpdate(confessionId, voteType);
        if (result === 'success') {
          return res.send(message.success('Confession vote updated successfully.'));
        }
        return res.send(message.error('Something went wrong.'));
      }
    }
    catch (error) {
      return res.send(message.error(error.message));
    }
  };

  // update a confession down vote
  updateConfessionDownVote = async (req, res) => { 
    const { id: confessionId } = req.params;
    const voteType = 'down';
    //   get user id from the access token
    const { id:userId } = req.user;
    if (!confessionId || !voteType) {
      return res.send(message.error('Please provide all the required fields.'));
    }
    try {
      const confessionVote = await models.confessionVotes.findOne({
        where: { user_id: userId, confession_id: confessionId }
      });
      if (!confessionVote) {
        return res.send(message.error('You have not voted for this confession.'));
      }
      // check if down vote already exists
      if (confessionVote.vote_type === voteType) {
        return res.send(message.error('You have already down voted for this confession.'));
      }
      const updatedConfessionVote = await models.confessionVotes.update({
        vote_type: voteType
      }, {
        where: { user_id: userId, confession_id: confessionId }
      });
      if (updatedConfessionVote) {
        const result = await this.updateConfessionVoteCountOnUpdate(confessionId, voteType);
        if (result === 'success') {
          return res.send(message.success('Confession vote updated successfully.'));
        }
        return res.send(message.error('Something went wrong.'));
      }
    }
    catch (error) {
      return res.send(message.error(error.message));
    }
  };

  // delete a confession up vote
  deleteConfessionUpVote = async (req, res) => {
    const { id: confessionId } = req.params;
    const voteType = 'up';
    //   get user id from the access token 
    const { id:userId } = req.user;
    if (!confessionId) {
      return res.send(message.error('Please provide all the required fields.'));
    }
    try {
      const confessionVote = await models.confessionVotes.findOne({
        where: { user_id: userId, confession_id: confessionId }
      });
      if (!confessionVote) {
        return res.send(message.error('You have not voted for this confession.'));
      }
      if (confessionVote.vote_type !== voteType) { 
        return res.send(message.error('You need to pass valid vote type'));
      }
      const deletedConfessionVote = await models.confessionVotes.destroy({
        where: { user_id: userId, confession_id: confessionId }
      });
      if (deletedConfessionVote) {
        const result = await this.deleteConfessionVote(confessionId, 'up');
        if (result === 'success') {
          return res.send(message.success('Confession vote deleted successfully.'));
        }
        return res.send(message.error('Something went wrong.'));
      }
    } catch (error) {
      return res.send(message.error(error.message));
    }
  };

  // delete a confession down vote
  deleteConfessionDownVote = async (req, res) => { 
    const { id: confessionId } = req.params;
    const voteType = 'down';
    //   get user id from the access token
    const { id:userId } = req.user;
    if (!confessionId) {
      return res.send(message.error('Please provide all the required fields.'));
    }
    try {
      const confessionVote = await models.confessionVotes.findOne({
        where: { user_id: userId, confession_id: confessionId }
      });
      if (!confessionVote) {
        return res.send(message.error('You have not voted for this confession.'));
      }
      if (confessionVote.vote_type !== voteType) { 
        return res.send(message.error('You need to pass valid vote type'));
      }
      const deletedConfessionVote = await models.confessionVotes.destroy({
        where: { user_id: userId, confession_id: confessionId }
      });
      if (deletedConfessionVote) {
        const result = await this.deleteConfessionVote(confessionId, voteType);
        if (result === 'success') {
          return res.send(message.success('Confession vote deleted successfully.'));
        }
        return res.send(message.error('Something went wrong.'));
      }
    } catch (error) {
      return res.send(message.error(error.message));
    }
  };

  // helper function
  // after up/down vote increment/decrement votes count in confession table
  updateConfessionVoteCount = async (confessionId, voteType) => { 
    try {
      const confession = await models.confessions.findOne({
        where: {
          id: confessionId
        }
      });
      if (voteType === 'up') {
        await confession.increment('upvote_count');
      } else {
        await confession.increment('downvote_count');
      }
      return 'success';
    }
    catch (error) {
      return error.message;
    }
  };

  // another helper function to update confession vote count on update from up to down or vice versa
  updateConfessionVoteCountOnUpdate = async (confessionId, voteType) => {
    try {
      const confession = await models.confessions.findOne({
        where: {
          id: confessionId
        }
      });
      if (voteType === 'up') {
        await confession.increment('upvote_count');
        await confession.decrement('downvote_count');
      } else {
        await confession.increment('downvote_count');
        await confession.decrement('upvote_count');
      }
      return 'success';
    }
    catch (error) {
      return error.message;
    }
  };

  // helper function on delete confession vote
  deleteConfessionVote = async (confessionId, voteType) => {
    try {
      const confession = await models.confessions.findOne({
        where: {
          id: confessionId
        }
      });
      if (voteType === 'up') {
        await confession.decrement('upvote_count');
      } else {
        await confession.decrement('downvote_count');
      }
      return 'success';
    }
    catch (error) {
      return error.message;
    }
  };

  getAllConfessionVotes = async (req, res) => {
    try {
      const allConfessionVotes = await models.confessionVotes.findAll({
        attributes: { exclude: ['user_id'] },
        include: [{
          model: models.users,
          attributes: ['handle']
        }]
      });
      if (allConfessionVotes) {
        return res.send(message.success( allConfessionVotes));
      } else {
        return res.send(message.error('No confession votes found'));
      }
    } catch (error) {
      return res.send(message.error(error.message));
    }
  };
  getConfessionVoteByUserId = async (req, res) => {
    let userId;
    if (req.params.id) {
      userId = req.params.id;
    } else {
      userId = req.user.id;
    }
    try {
      const confessionVote = await models.confessionVotes.findAll({
        where: { user_id: userId },
        include: [{
          model: models.users,
          attributes: ['handle']
        }]
      });
      if (confessionVote) {
        return res.send(message.success( confessionVote));
      } else {
        return res.send(message.error('No confession vote found'));
      }
    } catch (error) {
      return res.send(message.error(error.message));
    }
  };
  getConfessionVoteByConfessionId = async (req, res) => {
    const { id: confessionId } = req.params;
    try {
      const confessionVote = await models.confessionVotes.findOne({
        where: { confession_id: confessionId, user_id: req.user.id },
        include: [{
          model: models.users,
          attributes: ['handle']
        }]
      });
      if (confessionVote) {
        return res.send(message.success(confessionVote));
      } else {
        return res.send(message.error('No confession vote found'));
      }
    } catch (error) {
      return res.send(message.error(error.message));
    }
  };
  getConfessionVoteCountByConfessionId = async (req, res) => {
    const { id: confessionId } = req.params;
    try {
      // get all up votes count
      const upvoteCount = await models.confessionVotes.count({
        where: {
          confession_id: confessionId,
          vote_type: 'up'
        }
      });
      console.log('upvoteCount', upvoteCount);
      
      const downvoteCount = await models.confessionVotes.count({
        where: {
          confession_id: confessionId,
          vote_type: 'down'
        }
      });
      const totalVoteCount = upvoteCount - downvoteCount;
      const result =  {
        totalVoteCount,
        downvoteCount,
        upvoteCount
      };
      return res.send(message.success({ result }));
    } catch (error) {
      return res.send(message.error(error.message));
    }
  };
}


export default ConfessionVoteController;