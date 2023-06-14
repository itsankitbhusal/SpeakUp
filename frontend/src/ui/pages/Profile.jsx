import ProfileTemplate from '../templates/ProfileTemplate';
import { ProfileProvider } from '../../context/ProfileContext';

const Profile = () => (
  <>
    <div className='mx-[20vw] my-10'>
      <ProfileProvider>
        <ProfileTemplate />
      </ProfileProvider>
    </div>
  </>
);

export default Profile;