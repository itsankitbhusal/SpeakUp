import  { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdMarkEmailRead } from 'react-icons/md';
import Sidebar from '../atoms/Sidebar';
import Button from '../atoms/Button';
import Line from '../atoms/Line';
import { FiHome, FiLogOut } from 'react-icons/fi';
import { CgUserlane } from 'react-icons/cg';
import { IoChevronBackOutline } from 'react-icons/io5';
import { RiNotificationLine } from 'react-icons/ri';
import { showToast } from '../../utils/toast';
import decode from 'jwt-decode';
import { getNotificationsByUserId } from '../../services/notifications';

const SidebarLinks = () => {
  const [userHandle, setUserHandle] = useState('username');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

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

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  useEffect(() => {
    if (isNotificationOpen === false) {
      return;
    }
    const getData = async () => {
      const access = localStorage.getItem('access');
      if (!access) { return; }
      const { id } = decode(access);
      console.log('user id', id);
      const response = await getNotificationsByUserId(id);
      console.log('response', response);
      if (response.success) {
        console.log('notifications: ', response.data);
        setNotifications(response.data);
      }
    };
    getData();
  }, [isNotificationOpen]);

  const handleNotificationCardClick = () => {
    console.log('notification card clicked');
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
                  <div className=' flex items-center gap-4 justify-start w-full'>
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
            {/* 
            {
            "id": 12,
            "message": "another message",
            "confessions_id": null,
            "is_viewed": false,
            "created_at": "2023-06-24T15:10:31.000Z",
            "updated_at": "2023-06-24T15:10:31.000Z",
            "user": {
                "handle": "Grover.Marks85"
            },
            "confession": {
                "id": 1307,
                "title": "Reiciendis excepturi ea pariatur architecto deserunt voluptatem optio eveniet magnam.",
                "is_approved": true
            }
        },
            */}
            <div className='grid place-items-center gap-2 rounded-sm overflow-y-auto max-h-[75vh] '>
              {notifications?.map(notification => (
                <div key={notification.id} className='relative w-full grid place-items-center hover:cursor-pointer hover:bg-cwhite p-2 py-3'>
                  <p onClick={handleNotificationCardClick} className='text-sm rounded-sm w-full'>
                    {notification.confession ?(
                      <span className=' text-cblack'>
                        <span className='text-primary'>
                          {notification.message} -
                        </span>
                        {notification.confession.title.split(' ').slice(0, 5).join(' ')}</span>
                    ) : (
                      <span className=' text-primary'>{ notification.message }</span>
                    )}
                  </p>
                  <span className='underline text-primary font-bold text-end w-full text-sm hover:text-cblack '>Mark as read</span>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </Sidebar>
  );
};

export default SidebarLinks;