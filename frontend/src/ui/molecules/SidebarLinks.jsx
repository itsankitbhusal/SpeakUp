import Sidebar from '../atoms/Sidebar';
import Button from '../atoms/Button';
import Line from '../atoms/Line';
import { FiHome, FiLogOut } from 'react-icons/fi';
import { CgUserlane } from 'react-icons/cg';
import { RiNotificationLine } from 'react-icons/ri';

const SidebarLinks = () => (
  <Sidebar className="grid gap-4" >
    <div className=' text-lg w-full grid place-items-center'>
      <Button variant="user" > <CgUserlane />itsankitbhusal</Button>
    </div>
    <Line  />
    <div >
      <div className='w-full grid place-items-center'>
        <Button variant="ghost" className="w-full bg-transparent hover:bg-cwhite font-semibold">
          <div className=' flex items-center gap-4 justify-start w-full'>
            <FiHome />Home
          </div>
        </Button>
          
        <Button variant="ghost" className="w-full bg-transparent hover:bg-cwhite font-semibold">
          <div className=' flex items-center gap-4 justify-start w-full'>
            <RiNotificationLine />Notification
          </div>
        </Button>

        <Button variant="ghost" className="w-full bg-transparent hover:bg-cwhite font-semibold">
          <div className=' flex items-center gap-4 justify-start w-full'>
            <FiLogOut />Logout
          </div>
        </Button>

      </div>
    </div>
  </Sidebar>
);

export default SidebarLinks;