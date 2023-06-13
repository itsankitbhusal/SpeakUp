import { useState } from 'react';
import Navbar from '../organisms/Navbar';
import ProfileTemplate from '../templates/ProfileTemplate';
import { ProfileProvider } from '../../context/ProfileContext';

const Profile = () => {
  const [user, setUser] = useState(null);
  return (
    <>
      <Navbar />
      <div className='mx-[20vw] my-10'>
        <ProfileProvider>
          <ProfileTemplate user={user} />
        </ProfileProvider>
      </div>
    </>
  );
};

export default Profile;