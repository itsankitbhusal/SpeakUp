import Sidebar from '../atoms/Sidebar';
import Button from '../atoms/Button';
import { FiUser, FiHome, FiLogOut } from 'react-icons/fi'; 
import { RiNotificationLine } from 'react-icons/ri';

const SidebarLinks = () => (
  <div>
    <Sidebar className="flex flex-col justify-center items-center py-8 ">
      <div className=' text-lg  w-full'>
        <Button variant="outline-primary" className="w-full " > <FiUser className=' font-black' />itsankitbhusal</Button>
      </div>
      <div className=' py-8 '>

        <div className='w-full grid place-items-center '>
          <Button variant="ghost" className="w-full bg-transparent hover:bg-white font-semibold">
            <div className=' flex items-center gap-4 justify-start w-full'>
              <FiHome />Home
            </div>
          </Button>
          <Button variant="ghost" className="w-full bg-transparent hover:bg-white font-semibold">
            <div className=' flex items-center gap-4 justify-start w-full'>
              <RiNotificationLine />Notification
            </div>
          </Button>
          <Button variant="ghost" className="w-full bg-transparent hover:bg-white font-semibold">
            <div className=' flex items-center gap-4 justify-start w-full'>
              <FiLogOut />Logout
            </div>
          </Button>
        </div>
      </div>
    </Sidebar>
  </div>
);

export default SidebarLinks;