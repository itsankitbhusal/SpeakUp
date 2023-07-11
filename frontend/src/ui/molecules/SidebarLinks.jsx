import  { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../atoms/Sidebar';
import Button from '../atoms/Button';
import Line from '../atoms/Line';
import { FiHome, FiLogOut } from 'react-icons/fi';
import { CgUserlane } from 'react-icons/cg';
import { IoChevronBackOutline } from 'react-icons/io5';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { RiNotificationLine } from 'react-icons/ri';
import { showToast } from '../../utils/toast';
import decode from 'jwt-decode';
import { getNotificationsByUserId, updateNotificationStatus } from '../../services/notifications';
import Text from '../atoms/Text';

const SidebarLinks = () => {
  const [userHandle, setUserHandle] = useState('username');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

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
      const decodedUser = decode(access);
      if (decodedUser.role === 'admin') {
        setIsAdmin(true);
      }
      setUserHandle(decodedUser.handle);
    }
  }, [localStorage.getItem('access')]);

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  useEffect(() => {
    const getData = async () => {
      const access = localStorage.getItem('access');
      if (!access) { return; }
      const { id } = decode(access);
      const response = await getNotificationsByUserId(id);
      if (response.success) {
        setNotifications(response.data);
      }
    };
    getData();
  }, [isNotificationOpen]);

  const markAsRead = async id => {
    const response = await updateNotificationStatus(id);
    if (response.success) {
      // filter out the notification
      const newNotifications = notifications.filter(notification => notification.id !== id);
      setNotifications(newNotifications);
      showToast('Notification marked as read', 'success');
    } else {
      showToast('Something went wrong', 'error');
    }
  };
  
  return(
    <Sidebar className="grid gap-4" >
      {
        !isNotificationOpen && (
          <>
            <Link className='w-full' to='/profile'>
              <div className=' text-lg w-full grid place-items-center'>
                <Button variant="user" > <CgUserlane />{userHandle}</Button>
              </div>
            </Link>
            <Line />
            <div >
              {isAdmin && (
                <div className=' w-full mb-4'>
                  <Link to="/dashboard">
                    <Button
                      variant="outline-primary"
                      className="w-full hover:bg-cwhite font-semibold"
                    >
                      <div className=" flex items-center gap-4 justify-start w-full">
                        <MdOutlineDashboardCustomize />
                      Dashboard
                      </div>
                    </Button>
                  </Link>
                </div>
              )}
              <div className='w-full grid place-items-center'>
                <Link className='w-full' to='/'>
                  <Button variant="ghost" className="w-full bg-transparent hover:bg-cwhite font-semibold">
                    <div className=' flex items-center gap-4 justify-start w-full'>
                      <FiHome />Home
                    </div>
                  </Button>
                </Link>
          
                {/* <Link className='w-full' to='/notifications'> */}
                <Button onClick={handleNotificationClick} variant="ghost" className="w-full bg-transparent hover:bg-cwhite font-semibold">
                  <div className='relative flex items-center gap-4 justify-start w-full'>
                    {notifications?.length > 9 && (
                      <span className='absolute top-0 left-2 text-xs text-white bg-primary border rounded-full h-3 w-3 grid place-items-center'>9</span>
                    )}
                    {notifications?.length > 0 && (
                      <span className='absolute top-0 left-2 text-xs text-white bg-primary border rounded-full h-3 w-3 grid place-items-center'>{notifications.length}</span>
                    )}
                    
                    <RiNotificationLine />Notification
                  </div>
                </Button>
                {/* </Link> */}

                <Button variant="ghost" className="w-full bg-transparent hover:bg-cwhite font-semibold" onClick={logoutUser}>
                  <div className=' flex items-center gap-4 justify-start w-full'>
                    <FiLogOut />Logout
                  </div>
                </Button>

              </div>
            </div>
          
          </>
        )
      }
      <div className=' grid place-items-center gap-2'>
        {/* close notification button */}
        {isNotificationOpen && ( 
          <>
            <Button onClick={handleNotificationClick} variant="ghost" className="w-full bg-transparent hover:bg-cwhite font-semibold">
              <div className=' flex items-center gap-4 justify-start w-full'>
                <IoChevronBackOutline />Back
              </div>
            </Button>
            {/* notification */}
            <div className='grid place-items-center gap-2 rounded-sm overflow-y-auto max-h-[75vh] '>
              {notifications?.map(notification => (
                <div key={notification.id} className='relative w-full grid place-items-center hover:cursor-pointer hover:bg-cwhite p-2 py-3'>
                  <Text className='text-sm rounded-sm w-full '>
                    {notification && (
                      <span className=' text-cblack'>{ notification.message }</span>
                    )}
                  </Text>
                  <Text className=' w-full flex items-end justify-end'>
                    <span onClick={() => {
                      markAsRead(notification.id);
                    }} className='underline text-primary font-bold text-end text-sm hover:text-cblack '>Mark as read</span>
                  </Text>
                </div>
              ))}
              {notifications?.length === 0 && (
                <Text className='text-sm text-cblack'>No notifications</Text>
              )}
            </div>
          </>
        )}

      </div>
    </Sidebar>
  );
};

export default SidebarLinks;