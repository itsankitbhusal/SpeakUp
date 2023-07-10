import { useState, useEffect, useContext } from 'react';
import Text from '../atoms/Text';
import Line from '../atoms/Line';
import Comment from '../molecules/Comment';

import { CommentContext } from '../../context/CommentContext';
import { getCommentsByConfessionId } from '../../services/comments';

const CommentList = ({ confessionId, showComments }) => {
  const { comments, setComments, commentCount, setCommentCount, size } = useContext(CommentContext);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await getCommentsByConfessionId(confessionId, 1, size);
      if (response.success) {
        const { data } = response;
        setComments(data.rows);
        setCommentCount(data.count);
        setShowMore(data.count > size);
      } else {
        console.error(response.message);
      }
    };

    fetchComments();
  }, [confessionId, setComments, setCommentCount, size]);

  const handleSeeMore = async () => {
    const nextPage = Math.ceil(comments.length / size) + 1;
    const response = await getCommentsByConfessionId(confessionId, nextPage, size);
    if (response.success) {
      const { data } = response;
      setComments(prevComments => [...prevComments, ...data.rows]);
      setShowMore(data.count > nextPage * size);
    } else {
      console.error(response.message);
    }
  };

  return (
    <div className='relative'>
      {commentCount ? (
        <Text className='absolute text-sm -top-2 bg-inherit pr-2'>{commentCount} comments</Text>
      ) : (
        <Text className='absolute text-sm -top-2 bg-inherit pr-2'>No comments yet</Text>
      )}
      <Line className='my-0' />
      {showComments &&
        comments?.map(comment => (
          <div key={comment?.id || 0}>
            <Comment showComments={showComments} commentId={comment.id} handle={comment?.user?.handle || 'you'} date={comment?.created_at || 'just now'} body={comment?.body} />
          </div>
        ))}
      {showMore && (
        <div className='flex justify-end -mt-4'>
          <span onClick={handleSeeMore} className='pl-2 font-semibold text-md hover:cursor-pointer'>
            View more comments..
          </span>
        </div>
      )}
    </div>
  );
};

export default CommentList;
