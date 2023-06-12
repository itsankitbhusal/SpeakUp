import  { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../atoms/Sidebar';
import Button from '../atoms/Button';
import Line from '../atoms/Line';
import { FiHome, FiLogOut } from 'react-icons/fi';
import { CgUserlane } from 'react-icons/cg';
import { RiNotificationLine } from 'react-icons/ri';
import { showToast } from '../../utils/toast';
import decode from 'jwt-decode';

const SidebarLinks = () => {
  const [userHandle, setUserHandle] = useState('username');
  const navigate = useNavigate();
  // get id from access token
  const logoutUser = () => {
    const agree = window.confirm('Are you sure you want to logout?');
    if (!agree) { return; }
    localStorage.clear();
    showToast('Logged out successfully', 'success');
    navigate('/login');
  };
  // when user gets its first access token when on home page, than set the userHandle
  useEffect(() => {
    const access = localStorage.getItem('access');
    if (access) {
      const { handle } = decode(access);
      setUserHandle(handle);
    }
  }, [localStorage.getItem('access')]);
  
  return(
    <Sidebar className="grid gap-4" >
      <Link className='w-full' to='/profile'>
        <div className=' text-lg w-full grid place-items-center'>
          <Button variant="user" > <CgUserlane />{userHandle}</Button>
        </div>
      </Link>
      <Line />
      <div >
        <div className='w-full grid place-items-center'>
          <Link className='w-full' to='/'>
            <Button variant="ghost" className="w-full bg-transparent hover:bg-cwhite font-semibold">
              <div className=' flex items-center gap-4 justify-start w-full'>
                <FiHome />Home
              </div>
            </Button>
          </Link>
          
          <Link className='w-full' to='/notifications'>
            <Button variant="ghost" className="w-full bg-transparent hover:bg-cwhite font-semibold">
              <div className=' flex items-center gap-4 justify-start w-full'>
                <RiNotificationLine />Notification
              </div>
            </Button>
          </Link>

          <Button variant="ghost" className="w-full bg-transparent hover:bg-cwhite font-semibold" onClick={logoutUser}>
            <div className=' flex items-center gap-4 justify-start w-full'>
              <FiLogOut />Logout
            </div>
          </Button>

        </div>
      </div>
    </Sidebar>
  );
};

export default SidebarLinks;