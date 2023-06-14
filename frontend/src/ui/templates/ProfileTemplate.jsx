import UserProfile from '../organisms/UserProfile';
import ProfileConfessions from '../organisms/ProfileConfessions';

const ProfileTemplate = () => (
  <>
    <div className='relative grid place-items-center z-50'>
      <div className='w-full'>
        <div className='sticky top-0 z-20'>
          <UserProfile />
        </div>
        <div className=' flex justify-center'>
          <ProfileConfessions />
        </div>
      </div>
    </div>
  </>
);

export default ProfileTemplate;