import UserProfile from '../organisms/UserProfile';
import ProfileConfessions from '../organisms/ProfileConfessions';

const ProfileTemplate = () => (
  <>
    <div className=' grid place-items-center'>
      <div className=' flex w-full justify-evenly gap-0 items-start'>
        <div className='sticky top-20 w-1/4  pt-2  flex justify-start'>
          <UserProfile />
        </div>
        <ProfileConfessions />
      </div>
    </div>
  </>
);

export default ProfileTemplate;