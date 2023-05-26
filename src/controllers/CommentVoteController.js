import models from '../models/index.js';
import {  message } from '../utils/index.js';

class CommentVoteController{
  // create a comment vote
  createCommentUpVote = async (req, res) => { 
    const { id: commentId } = req.params;
    const voteType = 'up';
    //   get user id from the access token 
    const { id:userId } = req.user;
    if (!commentId ) {
      return res.send(message.error('Please provide comment id'));
    }
    try {
      const commentVote = await models.commentVotes.findOne({
        where: {
          user_id: userId,
          comment_id: commentId
        }
      });
      if (commentVote) {
        return res.send(message.error('You have already voted for this comment.'));
      }
      const newCommentVote = await models.commentVotes.create({
        user_id: id,
        comment_id: commentId,
        vote_type: voteType
      });
      if (newCommentVote) {
        const result = await this.updateCommentVoteCount(commentId, voteType);
        if (result === 'success') {
          return res.send(message.success('Comment vote created successfully.'));
        }
        return res.send(message.error('Something went wrong.'));
      }
    }
    catch (error) {
      return res.send(message.error(error.message));
    }
  };
    
  // create a comment down vote
  createCommentDownVote = async (req, res) => {
    const { id: commentId } = req.params;
    const voteType = 'down';
    //   get user id from the access token 
    const { id:userId } = req.user;
    if (!commentId ) {
      return res.send(message.error('Please provide comment id'));
    }
    try {
      const commentVote = await models.commentVotes.findOne({
        where: {
          user_id: userId,
          comment_id: commentId
        }
      });
      if (commentVote) {
        return res.send(message.error('You have already voted for this comment.'));
      }
      const newCommentVote = await models.commentVotes.create({
        user_id: id,
        comment_id: commentId,
        vote_type: voteType
      });
      if (newCommentVote) {
        const result = await this.updateCommentVoteCount(commentId, voteType);
        if (result === 'success') {
          return res.send(message.success('Comment vote created successfully.'));
        }
        return res.send(message.error('Something went wrong.'));
      }
    }
    catch (error) {
      return res.send(message.error(error.message));
    }
   
  };
  // update a comment up vote
  updateCommentUpVote = async (req, res) => {
    const { id: commentId } = req.params;
    const voteType = 'up';
    //   get user id from the access token handle
    const { id: userId } = req.user;
    
    if (!commentId) {
      return res.send(message.error('Please provide comment id'));
    }
    try {
      const commentVote = await models.commentVotes.findOne({
        where: {
          user_id: userId,
          comment_id: commentId
        }
      });
      // check if up vote already exists
      if (commentVote.vote_type === voteType) {
        return res.send(message.error('You have already voted for this comment.'));
      }
      if (!commentVote) {
        return res.send(message.error('You have not voted for this comment.'));
      }
      const updatedCommentVote = await models.commentVotes.update({
        vote_type: voteType
      }, {
        where: {
          user_id: id,
          comment_id: commentId
        }
      });
      if (updatedCommentVote) {
        const result = await this.updateCommentVoteCountOnUpdate(commentId, voteType);
        if (result === 'success') {
          return res.send(message.success('Comment vote updated successfully.'));
        }
        return res.send(message.error('Something went wrong.'));
      }
    }
    catch (error) {
      return res.send(message.error(error.message));
    }
  };

  // update a comment down vote
  updateCommentDownVote = async (req, res) => { 
    const { id: commentId } = req.params;
    const voteType = 'down';
    //   get user id from the access token 
    const { id:userId } = req.user;
    if (!commentId) {
      return res.send(message.error('Please provide comment id'));
    }
    try {
      const commentVote = await models.commentVotes.findOne({
        where: {
          user_id: userId,
          comment_id: commentId
        }
      });
      // check if up vote already exists
      if (commentVote.vote_type === voteType) {
        return res.send(message.error('You have already voted for this comment.'));
      }
      if (!commentVote) {
        return res.send(message.error('You have not voted for this comment.'));
      }
      const updatedCommentVote = await models.commentVotes.update({
        vote_type: voteType
      }, {
        where: {
          user_id: id,
          comment_id: commentId
        }
      });
      if (updatedCommentVote) {
        const result = await this.updateCommentVoteCountOnUpdate(commentId, voteType);
        if (result === 'success') {
          return res.send(message.success('Comment vote updated successfully.'));
        }
        return res.send(message.error('Something went wrong.'));
      }
    } catch (error) {
      res.send(message.error(error.message));
    }
  };

  // delete a comment up vote
  deleteCommentUpVote = async (req, res) => {
    const { id: commentId } = req.params;
    const voteType = 'up';
    //   get user id from the access token 
    const { id: userId } = req.user;
    
    if (!commentId) {
      return res.send(message.error('Please provide comment id'));
    }
    try {
      const commentVote = await models.commentVotes.findOne({
        where: {
          user_id: userId,
          comment_id: commentId
        }
      });
      // check if its an up vote
      if (commentVote?.vote_type !== voteType) {
        return res.send(message.error('You cannot perform this action.'));
      }
      if (!commentVote) {
        return res.send(message.error('You have not voted for this comment.'));
      }
      const deletedCommentVote = await models.commentVotes.destroy({
        where: {
          user_id: id,
          comment_id: commentId
        }
      });
      if (deletedCommentVote) {
        const result = await this.deleteCommentVote(commentId, voteType);
        if (result === 'success') {
          return res.send(message.success('Comment vote deleted successfully.'));
        }
        return res.send(message.error('Something went wrong.'));
      }
    }
    catch (error) {
      return res.send(message.error(error.message));
    }  
  };

  // delete a comment down vote
  deleteCommentDownVote = async (req, res) => {
    const { id: commentId } = req.params;
    const voteType = 'down';
    //   get user id from the access token 
    const { id:userId } = req.user;
    if (!commentId) {
      return res.send(message.error('Please provide comment id'));
    }
    try {
      const commentVote = await models.commentVotes.findOne({
        where: {
          user_id: userId,
          comment_id: commentId
        }
      });
      // check if its an down vote
      if (commentVote?.vote_type !== voteType) {
        return res.send(message.error('You cannot perform this action.'));
      }
      if (!commentVote) {
        return res.send(message.error('You have not voted for this comment.'));
      }
      const deletedCommentVote = await models.commentVotes.destroy({
        where: {
          user_id: id,
          comment_id: commentId
        }
      });
      if (deletedCommentVote) {
        const result = await this.deleteCommentVote(commentId, voteType);
        if (result === 'success') {
          return res.send(message.success('Comment vote deleted successfully.'));
        }
        return res.send(message.error('Something went wrong.'));
      }
    }
    catch (error) {
      return res.send(message.error(error.message));
    }

  };

  // helper function
  // after up/down vote increment/decrement votes count in comment table
  updateCommentVoteCount = async (commentId, voteType) => { 
    try {
      const comment = await models.comments.findOne({
        where: {
          id: commentId
        }
      });
      if (voteType === 'up') {
        await comment.increment('upvote_count');
      } else {
        await comment.increment('downvote_count');
      }
      return 'success';
    }
    catch (error) {
      return error.message;
    }
  };

  // another helper function to update comment vote count on update from up to down or vice versa
  updateCommentVoteCountOnUpdate = async (commentId, voteType) => {
    try {
      const comment = await models.comments.findOne({
        where: {
          id: commentId
        }
      });
      if (voteType === 'up') {
        await comment.increment('upvote_count');
        await comment.decrement('downvote_count');
      } else {
        await comment.increment('downvote_count');
        await comment.decrement('upvote_count');
      }
      return 'success';
    }
    catch (error) {
      return error.message;
    }
  };

  // helper function on delete comment vote
  deleteCommentVote = async (commentId, voteType) => {
    try {
      const comment = await models.comments.findOne({
        where: {
          id: commentId
        }
      });
      if (voteType === 'up') {
        await comment.decrement('upvote_count');
      } else {
        await comment.decrement('downvote_count');
      }
      return 'success';
    }
    catch (error) {
      return error.message;
    }
  };


}

export default CommentVoteController;