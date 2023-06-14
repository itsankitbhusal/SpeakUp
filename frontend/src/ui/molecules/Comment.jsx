import Text from '../atoms/Text';
import ReactMarkdown from 'react-markdown';
import UserDetail from '../molecules/UserDetail';
import VotesBtn from '../molecules/VotesBtn';
import { dateConverter } from '../../utils/dateConverter';

const Comment = ({ body, handle, date, commentId, showComments }) => {
  const convertedDate = dateConverter(date);
  return(
    <>
      <div className=' w-full flex gap-2 justify-start items-center' >
        <VotesBtn showComments={showComments} commentId={commentId} />
        <div className='w-full'>
          <UserDetail commentId={commentId} className="text-sm" handle={handle} date={convertedDate} />
          <Text div className="text-justify text-md flex flex-wrap">
            <ReactMarkdown>
              {body}
            </ReactMarkdown>
          </Text>
        </div>
      </div>
    </>
  );
};

export default Comment;