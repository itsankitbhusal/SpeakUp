import { useState } from 'react';
import UserDetail from '../molecules/UserDetail';
import Heading from '../atoms/Heading';
import Line from '../atoms/Line';
import Text from '../atoms/Text';
import VotesBtn from './VotesBtn';
import { FaCommentAlt } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

const ConfessionPost = ({ handle, date, views, title, body, confessionId }) => {
  const [showFullConfession, setShowFullConfession] = useState(false);

  const toggleContent = () => {
    setShowFullConfession(!showFullConfession);
  };
  const maxWords = 72;

  const trimBody = text => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      const trimmedWords = words.slice(0, maxWords);
      return `${ trimmedWords.join(' ') }...`;
    }
    return text;
  };
  const trimmedBody = trimBody(body);
  return (
    <div>
      <UserDetail handle={handle} date={date} views={views} />
      <Heading heading="h4" className="text-black text-base text-justify">
        {title}
      </Heading>
      <Line className="mt-0" />
      <div className=" flex justify-center items-start gap-2">
        <div className="w-1/12 flex flex-col justify-between items-center gap-6">
          <VotesBtn confessionId={confessionId} />
          <FaCommentAlt className=" text-primary text-xl" />
        </div>
        <div className="w-11/12">
          <Text div className="text-justify text-[.9rem] flex flex-wrap">
            <ReactMarkdown>{showFullConfession ? body : trimmedBody}</ReactMarkdown>
            {!showFullConfession && trimmedBody.endsWith('...') && (
              <span onClick={toggleContent} className="ml-2 w-full flex justify-end -mt-6 font-semibold cursor-pointer ">
                <span className='bg-white pl-2'>See more</span>
              </span>
            )}
          </Text>
        </div>

      </div>
    </div>
  );
};
export default ConfessionPost;
