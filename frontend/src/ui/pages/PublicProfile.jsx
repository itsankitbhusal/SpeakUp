import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProfileTemplate from '../templates/ProfileTemplate';
import { ProfileContext } from '../../context/ProfileContext';


const PublicProfile = () => {
  const { handle } = useParams();
  const { setProfileHandle } = useContext(ProfileContext);
  
  useEffect(() => {
    setProfileHandle(handle);
  }, [handle, setProfileHandle]);


  return (
    <>
      <ProfileTemplate handle={handle} />
    </>
  );
};

export default PublicProfile;
