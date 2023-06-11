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

const VotesBtn = ({ className, small, confessionId, commentId }) => {
  const [votes, setVotes] = useState({
    upvotes: 0,
    downvotes: 0,
    totalVote: 0
  });
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);

  const getVoteCount = async (id, isComment) => {
    const voteCount = isComment ? await getVotesComment(id) : await getVotes(id);
    const data = voteCount.data.result;
    setVotes({
      upvotes: data.upvoteCount,
      downvotes: data.downvoteCount,
      totalVote: data.totalVoteCount
    });
  };

  const getVotesByItemId = async (id, isComment) => {
    const votesFromId = isComment
      ? await getVotesByCommentIdAndUserIdComment(id)
      : await getVotesByConfessionIdAndUserId(id);
    if (votesFromId) {
      const data = votesFromId?.data;
      if (data?.vote_type === 'up') {
        setHasUpvoted(true);
      } else if (data?.vote_type === 'down') {
        setHasDownvoted(true);
      }
    }
  };
  

  useEffect(() => {
    if (confessionId) {
      getVoteCount(confessionId, false);
      getVotesByItemId(confessionId, false);
    } else if (commentId) {
      getVoteCount(commentId, true);
      getVotesByItemId(commentId, true);
    }
  }, [confessionId, commentId]);

  const handleUpvote = async () => {
    if (confessionId) {
      // Confession vote
      if (hasUpvoted) {
        // delete upvote
        await deleteUpvote(confessionId);
        setHasUpvoted(false);
        setVotes(prevVotes => ({
          ...prevVotes,
          upvotes: prevVotes.upvotes - 1,
          totalVote: prevVotes.totalVote - 1
        }));
      } else if (hasDownvoted) {
        // update downvote to upvote
        await updateDownvote(confessionId);
        setHasUpvoted(true);
        setHasDownvoted(false);
        setVotes(prevVotes => ({
          ...prevVotes,
          upvotes: prevVotes.upvotes + 1,
          downvotes: prevVotes.downvotes - 1,
          totalVote: prevVotes.totalVote + 2
        }));
      } else {
        // create upvote
        await createUpvote(confessionId);
        setHasUpvoted(true);
        setVotes(prevVotes => ({
          ...prevVotes,
          upvotes: prevVotes.upvotes + 1,
          totalVote: prevVotes.totalVote + 1
        }));
      }
    } else if (commentId) {
      // Comment vote
      if (hasUpvoted) {
        // delete upvote
        const response = await deleteUpvoteComment(commentId);
        if (response.success) {
          setHasUpvoted(false);
          setVotes(prevVotes => ({
            ...prevVotes,
            upvotes: prevVotes.upvotes - 1,
            totalVote: prevVotes.totalVote - 1
          }));
        } else {
          console.error('Error while deleting upvote: ', response.message);
        }
      } else if (hasDownvoted) {
        // update downvote to upvote
        const response = await updateDownvoteComment(commentId);
        if (response.success) {
          setHasUpvoted(true);
          setHasDownvoted(false);
          setVotes(prevVotes => ({
            ...prevVotes,
            upvotes: prevVotes.upvotes + 1,
            downvotes: prevVotes.downvotes - 1,
            totalVote: prevVotes.totalVote + 2
          }));
        } else {
          console.error('Error while updating downvote to upvote: ', response.message);
        }
      } else {
        // create upvote
        const response = await createUpvoteComment(commentId);
        if (response.success) {
          setHasUpvoted(true);
          setVotes(prevVotes => ({
            ...prevVotes,
            upvotes: prevVotes.upvotes + 1,
            totalVote: prevVotes.totalVote + 1
          }));
        } else {
          console.error('Error while creating upvote: ', response.message);
        }
      }
    }
  };

  const handleDownvote = async () => {
    if (confessionId) {
      // Confession vote
      if (hasDownvoted) {
        // delete downvote
        const response = await deleteDownvote(confessionId);
        if (response.success) {
          setHasDownvoted(false);
          setVotes(prevVotes => ({
            ...prevVotes,
            downvotes: prevVotes.downvotes - 1,
            totalVote: prevVotes.totalVote + 1
          }));
        } else {
          console.error('Error while deleting downvote: ', response.message);
        }
      } else if (hasUpvoted) {
        // update upvote to downvote
        const response = await updateUpvote(confessionId);
        if (response.success) {
          setHasDownvoted(true);
          setHasUpvoted(false);
          setVotes(prevVotes => ({
            ...prevVotes,
            upvotes: prevVotes.upvotes - 1,
            downvotes: prevVotes.downvotes + 1,
            totalVote: prevVotes.totalVote - 2
          }));
        } else {
          console.error('Error while updating upvote to downvote: ', response.message);
        }
      } else {
        // create downvote
        const response = await createDownvote(confessionId);
        if (response.success) {
          setHasDownvoted(true);
          setVotes(prevVotes => ({
            ...prevVotes,
            downvotes: prevVotes.downvotes + 1,
            totalVote: prevVotes.totalVote - 1
          }));
        } else {
          console.error('Error while creating downvote: ', response.message);
        }
      }
    } else if (commentId) {
      // Comment vote
      if (hasDownvoted) {
        // delete downvote
        const response = await deleteDownvoteComment(commentId);
        if (response.success) {
          setHasDownvoted(false);
          setVotes(prevVotes => ({
            ...prevVotes,
            downvotes: prevVotes.downvotes - 1,
            totalVote: prevVotes.totalVote + 1
          }));
        } else {
          console.error('Error while deleting downvote: ', response.message);
        }
      } else if (hasUpvoted) {
        // update upvote to downvote
        const response = await updateUpvoteComment(commentId);
        if (response.success) {
          setHasDownvoted(true);
          setHasUpvoted(false);
          setVotes(prevVotes => ({
            ...prevVotes,
            upvotes: prevVotes.upvotes - 1,
            downvotes: prevVotes.downvotes + 1,
            totalVote: prevVotes.totalVote - 2
          }));
        } else {
          console.error('Error while updating upvote to downvote: ', response.message);
        }
      } else {
        // create downvote
        const response = await createDownvoteComment(commentId);
        if (response.success) {
          setHasDownvoted(true);
          setVotes(prevVotes => ({
            ...prevVotes,
            downvotes: prevVotes.downvotes + 1,
            totalVote: prevVotes.totalVote - 1
          }));
        } else {
          console.error('Error while creating downvote: ', response.message);
        }
      }
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
              className={hasUpvoted ? 'text-accent hover:text-accentDark' : null}
            >
              <GoTriangleUp />
            </span>
          </div>
          <span className="text-[.8rem] text-cblack px-2">{votes.totalVote}</span>
          <div
            onClick={handleDownvote}
            className="hover:cursor-pointer hover:text-primaryDark transition-all"
          >
            <span
              className={hasDownvoted ? 'text-accent hover:text-accentDark' : null}
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
