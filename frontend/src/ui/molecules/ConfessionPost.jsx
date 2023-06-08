import UserDetail from '../molecules/UserDetail';
import Heading from '../atoms/Heading';
import Line from '../atoms/Line';
import Text from '../atoms/Text';
import VotesBtn from './VotesBtn';
import { FaCommentAlt } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

const ConfessionPost = ({ handle, date, views, title, body, confessionId }) => (
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
      <div className=" w-11/12">
        <Text div className=" text-justify text-[.9rem]">
          <ReactMarkdown className=" grid gap-2">{body}</ReactMarkdown>
        </Text>
      </div>
    </div>
  </div>
);
export default ConfessionPost;
