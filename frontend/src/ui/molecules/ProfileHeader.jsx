import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsPostcard } from 'react-icons/bs';
import { FaRegComments } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineTrophy } from 'react-icons/ai';
import { BiUpvote } from 'react-icons/bi';
import { MdArrowBackIos } from 'react-icons/md';

import { ProfileContext } from '../../context/ProfileContext';
import Line from '../atoms/Line';
import Button from '../atoms/Button';

const ProfileHeader = () => {
  const { user, getUserData, profileAvatar } = useContext(ProfileContext);

  const dateFormat = dateString => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className='w-full flex flex-col items-center justify-center white'>
      <div className='w-full flex flex-col items-center justify-center mt-4'>
        <div className='absolute w-full'>
          <Link to="/">
            <Button variant="ghost" ><MdArrowBackIos />Back</Button>
          </Link>
        </div>
        <div className='w-full inline-grid place-items-center text-4xl text-primary font-black'>
          <div className=' inline-grid place-items-center'>
            <div className=' flex items-center gap-4 justify-center'>
              <img src={user && profileAvatar } alt='av' className='w-16 h-16 rounded-full bg-primaryLight' />
              {user ? `@${ user.handle }` : 'handle not found'}
            </div>
            <div className='w-full -mt-4'>
              <div className='flex flex-col items-end justify-center'>
                <div className='text-base font-normal text-cblack'><span>Joined on </span><span className=' font-semibold'>{ user? dateFormat(user.created_at): '0' } </span></div>
              </div>
            </div>
          </div>
        </div>
        <Line />
        <div className='flex items-center justify-center mt-4 gap-8 flex-wrap'>
          <div className='flex flex-col items-center justify-center'>
            <div className='text-base font-bold'>Confessions</div>
            <div className='text-xl font-bold flex items-center gap-2 justify-center text-cblack'><BsPostcard className='-mt-1' />{ user? user.confessionCount: '0'}</div>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div className='text-base font-bold'>Comments</div>
            <div className='text-xl font-bold flex items-center gap-2 justify-center text-cblack'><FaRegComments className='-mt-1' />{ user? user.commentCount: '0'}</div>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div className='text-base font-bold'>Total views</div>
            <div className='text-xl font-bold flex items-center gap-2 justify-center text-cblack'><AiOutlineEye className='-mt-1' />{user? user.totalViews: '0'}</div>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div className='text-base font-bold'>Top Confession</div>
            <div className='text-xl font-bold flex items-center gap-2 justify-center text-cblack'><AiOutlineTrophy className='-mt-1' />{ user?.highestViewedConfession?.view_count? user?.highestViewedConfession?.view_count :'0'}</div>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div className='text-base font-bold'>Top Vote</div>
            <div className='text-xl font-bold flex items-center gap-2 justify-center text-cblack'><BiUpvote className='-mt-1' />{ user?.highestUpvotedConfession?.upvote_count ? user?.highestUpvotedConfession?.upvote_count : 0}</div>
          </div>
        </div>
      </div>
      <Line className='mt-8 mb-0 max-w-[40vw]' />
    </div>
  );
};

export default ProfileHeader;