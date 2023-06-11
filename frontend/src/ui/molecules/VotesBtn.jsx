import { useEffect, useState } from 'react';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import {
  createUpvote,
  createDownvote,
  updateUpvote,
  updateDownvote,
  deleteUpvote,
  deleteDownvote,
  getVotesByConfessionIdAndUserId,
  getVotes
} from '../../services/confessionVotes';
import {
  createUpvoteComment,
  createDownvoteComment,
  updateUpvoteComment,
  updateDownvoteComment,
  deleteUpvoteComment,
  deleteDownvoteComment,
  getVotesByCommentIdAndUserIdComment,
  getVotesComment
} from '../../services/commentVotes';

const VotesBtn = ({ className, small, confessionId, commentId, comment }) => {
  const [votes, setVotes] = useState({
    upvotes: 0,
    downvotes: 0,
    totalVote: 0
  });
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);

  const getVoteCount = async id => {
    // const voteCount = await getVotes(id);
    const voteCount = comment ? await getVotesComment(id) : await getVotes(id);
    if (voteCount.success) {
      const data = voteCount?.data?.result;
      setVotes({
        upvotes: data?.upvoteCount,
        downvotes: data?.downvoteCount,
        totalVote: data?.totalVoteCount
      });
    }
    return true;
  };
  const getVotesByConfessionId = async id => {
    // const votesFromId = await getVotesByConfessionIdAndUserId(id);
    const votesFromId = comment ? await getVotesByCommentIdAndUserIdComment(id) : await getVotesByConfessionIdAndUserId(id);
    if (votesFromId.success) {
      const data = votesFromId?.data[0];
      console.log('votes from id', data);
      if (data?.vote_types === 'up') {
        setHasUpvoted(true);
      } else if (data?.vote_types === 'down') {
        setHasDownvoted(true);
      } else {
        setHasUpvoted(false);
        setHasDownvoted(false);
      }
    } else {
      throw new Error(
        // 'Something went wrong while getting votes by confession id'
        'Something went wrong while getting votes by confession id or comment id'
      );
    }
  };
  useEffect(() => {
    // getVoteCount(confessionId);
    getVoteCount(comment ? commentId : confessionId);
    // getVotesByConfessionId(confessionId);
    getVotesByConfessionId(comment ? commentId : confessionId);
  }, [confessionId, commentId]);

  const handleUpvote = async () => {
    if (hasUpvoted) {
      // delete upvote
      // const deletedUpvote = await deleteUpvote(confessionId);
      const deletedUpvote = comment ? await deleteUpvoteComment(commentId) : await deleteUpvote(confessionId);
      if (deletedUpvote.success) {
        setHasUpvoted(false);
        setVotes({
          ...votes,
          upvotes: votes.upvotes - 1,
          totalVote: votes.totalVote - 1
        });
      } else {
        // throw new Error('Something went wrong while deleting upvote');
        throw new Error('Something went wrong while deleting upvote or comment upvote');
      }
    } else if (hasDownvoted) {
      // update downvote to upvote
      // const updatedUpvote = await updateDownvote(confessionId);
      const updatedUpvote = comment ? await updateDownvoteComment(commentId) : await updateDownvote(confessionId);
      if (updatedUpvote.success) {
        setHasUpvoted(true);
        setHasDownvoted(false);
        setVotes({
          ...votes,
          upvotes: votes.upvotes + 1,
          downvotes: votes.downvotes - 1,
          totalVote: votes.totalVote + 2
        });
      } else {
        throw new Error(
          // 'Something went wrong while updating downvote to upvote'
          'Something went wrong while updating downvote to upvote or comment downvote to upvote'
        );
      }
    } else if (!hasDownvoted) {
      // create upvote
      // const createdUpvote = await createUpvote(confessionId);
      const createdUpvote = comment ? await createUpvoteComment(commentId) : await createUpvote(confessionId);
      if (createdUpvote.success) {
        setHasUpvoted(true);
        setVotes({
          ...votes,
          upvotes: votes.upvotes + 1,
          totalVote: votes.totalVote + 1
        });
      } else {
        throw new Error('Something went wrong while creating upvote');
      }
    } else {
      throw new Error('Something went wrong');
    }
  };

  const handleDownvote = async () => {
    if (hasDownvoted) {
      // delete downvote
      // const deletedDownvote = await deleteDownvote(confessionId);
      const deletedDownvote = comment ? await deleteDownvoteComment(commentId) : await deleteDownvote(confessionId);
      if (deletedDownvote.success) {
        setHasDownvoted(false);
        setVotes({
          ...votes,
          downvotes: votes.downvotes - 1,
          totalVote: votes.totalVote + 1
        });
      } else {
        throw new Error('Something went wrong while deleting downvote');
      }
    } else if (hasUpvoted) {
      // update upvote to downvote
      // const updatedDownvote = await updateUpvote(confessionId);
      const updatedDownvote = comment ? await updateUpvoteComment(commentId) : await updateUpvote(confessionId);
      if (updatedDownvote) {
        setHasDownvoted(true);
        setHasUpvoted(false);
        setVotes({
          ...votes,
          upvotes: votes.upvotes - 1,
          downvotes: votes.downvotes + 1,
          totalVote: votes.totalVote - 2
        });
      } else {
        throw new Error(
          'Something went wrong while updating upvote to downvote'
        );
      }
    } else if (!hasUpvoted) {
      // create downvote
      // const createdDownvote = await createDownvote(confessionId);
      const createdDownvote = comment ? await createDownvoteComment(commentId) : await createDownvote(confessionId);
      if (createdDownvote.success) {
        setHasDownvoted(true);
        setVotes({
          ...votes,
          downvotes: votes.downvotes + 1,
          totalVote: votes.totalVote - 1
        });
      } else {
        throw new Error('Something went wrong while creating downvote');
      }
    } else {
      throw new Error('Something went wrong');
    }
  };

  return (
    <>
      <div
        className={`flex justify-between items-center ${
          small ? 'text-xl' : 'text-3xl'
        } ${ className }`}
      >
        <div className="flex flex-col justify-between items-center text-primary ">
          <div
            onClick={handleUpvote}
            className="hover:cursor-pointer hover:text-primaryDark transition-all"
          >
            <span
              className={
                hasUpvoted ? 'text-accent hover:text-accentDark' : null
              }
            >
              <GoTriangleUp />
            </span>
          </div>
          <span className=" text-[.8rem] text-cblack px-2">
            {votes.totalVote}
          </span>
          <div
            onClick={handleDownvote}
            className="hover:cursor-pointer hover:text-primaryDark transition-all"
          >
            <span
              className={
                hasDownvoted ? 'text-accent hover:text-accentDark' : null
              }
            >
              <GoTriangleDown />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default VotesBtn;
