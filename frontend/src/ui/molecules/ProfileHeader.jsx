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
  const { user, getUserData, userDataLoading, profileAvatar } = useContext(ProfileContext);

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
    <div className="w-full flex flex-col items-center justify-center white">
      <div className="w-full flex flex-col items-center justify-center mt-4">
        <div className="absolute -top-0 sm:top-24 left-0 inline-block">
          <Link to="/">
            <Button variant="ghost">
              <MdArrowBackIos />
              Back
            </Button>
          </Link>
        </div>
        {userDataLoading && (
          <div className="w-full inline-grid place-items-center text-primary font-black">
            <div className=" inline-grid place-items-center">
              <div className=" flex items-center flex-col sm:flex-row gap-4 justify-center">
                <img
                  src={profileAvatar}
                  alt="av"
                  className="w-16 h-16 rounded-full bg-primaryLight"
                />
                <span className=" text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                  Loading...
                </span>
              </div>
              <div className="w-full -mt-2">
                <div className="flex flex-col items-end justify-center">
                  <div className="text-base font-normal text-cblack">
                    <span>Joined on </span>
                    <span className=" font-semibold">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!userDataLoading && (
          <>
            <div className="w-full inline-grid place-items-center text-primary font-black">
              <div className=" inline-grid place-items-center">
                <div className=" flex items-center flex-col sm:flex-row gap-4 justify-center">
                  <img
                    src={user && profileAvatar}
                    alt="av"
                    className="w-16 h-16 rounded-full bg-primaryLight"
                  />
                  <span className=" text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    {user ? `@${ user.handle }` : 'handle not found'}
                  </span>
                </div>
                <div className="w-full -mt-2">
                  <div className="flex flex-col items-end justify-center">
                    <div className="text-base font-normal text-cblack">
                      <span>Joined on </span>
                      <span className=" font-semibold">
                        {user ? dateFormat(user.created_at) : '0'}{' '}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Line />
            <div className="flex w-full items-center justify-center mt-4 gap-2 md:gap-8 flex-wrap">
              <div className="flex flex-col items-center justify-center">
                <div className="text-sm sm:text-base font-bold">
                  Confessions
                </div>
                <div className="text-base md:text-lg lg:text-xl font-bold flex items-center gap-2 justify-center text-cblack">
                  <BsPostcard className="-mt-1" />
                  {user ? user.confessionCount : '0'}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="text-sm sm:text-base font-bold">Comments</div>
                <div className="text-base md:text-lg lg:text-xl font-bold flex items-center gap-2 justify-center text-cblack">
                  <FaRegComments className="-mt-1" />
                  {user ? user.commentCount : '0'}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="text-sm sm:text-base font-bold">
                  Total views
                </div>
                <div className="text-base md:text-lg lg:text-xl font-bold flex items-center gap-2 justify-center text-cblack">
                  <AiOutlineEye className="-mt-1" />
                  {user ? user.totalViews : '0'}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="text-sm sm:text-base font-bold">
                  Top Confession
                </div>
                <div className="text-base md:text-lg lg:text-xl font-bold flex items-center gap-2 justify-center text-cblack">
                  <AiOutlineTrophy className="-mt-1" />
                  {user?.highestViewedConfession?.view_count
                    ? user?.highestViewedConfession?.view_count
                    : '0'}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="text-sm sm:text-base font-bold">Top Vote</div>
                <div className="text-base md:text-lg lg:text-xl font-bold flex items-center gap-2 justify-center text-cblack">
                  <BiUpvote className="-mt-1" />
                  {user?.highestUpvotedConfession?.upvote_count
                    ? user?.highestUpvotedConfession?.upvote_count
                    : 0}
                </div>
              </div>
            </div>
            <Line className="mt-2 mb-0 max-w-[40vw]" />
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
