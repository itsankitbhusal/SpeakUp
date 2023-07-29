import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserDetail from '../molecules/UserDetail';
import Heading from '../atoms/Heading';
import Line from '../atoms/Line';
import VotesBtn from './VotesBtn';
import { FaCommentAlt } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import WriteComment from './WriteComment';
import CommentList from '../organisms/CommentList';
import { CommentProvider } from '../../context/CommentContext';
import { NavbarContext } from '../../context/NavbarContext';
import { showToast } from '../../utils/toast';

const ConfessionPost = ({ handle, date, views, title, body, confessionId, isApproved, isProfile, trending }) => {
  const url = 'http://localhost:5173';
  const { isVerifiedUser } = useContext(NavbarContext);

  const [showFullConfession, setShowFullConfession] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const confessionBody = body;

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
  
  const trimmedBody = trimBody(confessionBody);

  const handleCommentClick = () => {
    if (!isVerifiedUser) {
      showToast('Please verify account to comment', 'error');
      return;
    }
    setShowComments(!showComments);
  };

  const linkToTags = (user, href) => {
    if (user === true) {
      return `${ url }/tag/${ href }`;
    } else {
      return '#';
    }
  };

  const CustomLink = ({ href, children, ...otherProps }) => (
    <Link
      to={linkToTags(isVerifiedUser, href)}
      className='bg-blue-100 hover:bg-blue-200'
      {...otherProps}
    >
      {children}
    </Link>
  );

  const CustomPre = ({ children }) => (
    <pre className="whitespace-pre-wrap bg-blue-50 my-4 overflow-x-auto">{children}</pre>
  );

  return (
    <div className='' >
      <UserDetail handle={handle} date={date} views={views} isApproved={isApproved} isProfile={isProfile} confessionId={confessionId} />
      <Heading heading="h4" className="text-black text-base text-justify mt-1">
        {title}
      </Heading>
      <Line className="mt-0" />
      <div className=" flex justify-center items-start gap-2">
        <div className="w-1/12 flex flex-col justify-between items-center gap-6">
          <VotesBtn confessionId={confessionId} />
          <div className='hover:cursor-pointer' title='Show comments'>
            <FaCommentAlt onClick={handleCommentClick} className=" text-primary hover:text-primaryDark text-xl" />
          </div>
        </div>
        <div className="w-11/12">

          <ReactMarkdown
            components={{ a: CustomLink, pre: CustomPre }}
          >
            {showFullConfession ? (confessionBody) : (trimmedBody)}
          </ReactMarkdown>
          {!showFullConfession && trimmedBody.endsWith('...') && (
            <span onClick={toggleContent} className="ml-2 w-full flex justify-end -mt-6 font-semibold cursor-pointer ">
              <span className={`px-2 rounded-full  ${ trending ? 'bg-white': 'bg-cwhite' }`}>See more</span>
            </span>
          )}
          <CommentProvider>
            <div className="my-4">
              <WriteComment confessionId={confessionId} />
            </div>
            {showComments && (
              <CommentList confessionId={confessionId} showComments={showComments} />
            )}
          </CommentProvider>
        </div>
      </div>
    </div>
  );
};
  
export default ConfessionPost;
