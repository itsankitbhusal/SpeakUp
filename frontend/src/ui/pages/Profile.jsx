import ProfileTemplate from '../templates/ProfileTemplate';
import { ProfileProvider } from '../../context/ProfileContext';

const Profile = () => (
  <>
    <div className='mx-0 md:mx-[10vw] lg:mx-[20vw]'>
      <ProfileProvider>
        <ProfileTemplate />
      </ProfileProvider>
    </div>
  </>
);

export default Profile;