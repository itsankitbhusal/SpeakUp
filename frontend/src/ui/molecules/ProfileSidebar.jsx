import { useEffect, useContext } from 'react';
import Sidebar from '../atoms/Sidebar';
import { ProfileContext } from '../../context/ProfileContext';
import Line from '../atoms/Line';
const ProfileSidebar = () => {
  const { user, getUserData } = useContext(ProfileContext);

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
    <Sidebar className='max-w-[50vw] min-w-[20vw] text-start bg-blue-50'>
      <div className='flex flex-col items-start justify-center'>
        <div className='flex flex-col items-start justify-center'>
          <div className='mt-2 text-lg font-bold'>Profile</div>
        </div>
        <Line />
        <div>
          <div className='flex flex-col items-start justify-center mt-4'>
            <div className='flex flex-col items-start justify-center'>
              <div className='text-base font-bold'>{user? user.handle : 'handle not found'}</div>
            </div>
            <div className='flex flex-col items-start justify-center mt-4'>
              <div className='flex flex-col items-start justify-center'>
                <div className='text-base font-bold'>Confessions Made</div>
                <div className='text-lg font-bold'>{ user? user.confessionCount: '0'}</div>
              </div>
              <div className='flex flex-col items-start justify-center'>
                <div className='text-base font-bold'>Comments Made</div>
                <div className='text-lg font-bold'>{ user? user.commentCount: '0'}</div>
              </div>
              <div className='flex flex-col items-start justify-center'>
                <div className='text-base font-bold'>Joined</div>
                <div className='text-lg font-bold'>{ user? dateFormat(user.created_at): '0' }</div>
              </div>
              <div className='flex flex-col items-start justify-center'>
                <div className='text-base font-bold'>Total confession views</div>
                <div className='text-lg font-bold'>{user? user.totalViews: '0'}</div>
              </div>
              <div className='flex flex-col items-start justify-center'>
                <div className='text-base font-bold'>Highest view in a confession</div>
                <div className='text-lg font-bold'>{ user? user?.highestViewedConfession?.view_count: '0'}</div>
              </div>
              <div className='flex flex-col items-start justify-center'>
                <div className='text-base font-bold'>Highest upvote in a confession</div>
                <div className='text-lg font-bold'>{ user? user?.highestUpvotedConfession?.upvote_count: '0'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default ProfileSidebar;