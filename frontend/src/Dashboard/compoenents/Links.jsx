import { Link, useNavigate } from 'react-router-dom';
import Button from '../../ui/atoms/Button';
import Line from '../../ui/atoms/Line';
import { FiHome, FiLogOut, FiUsers } from 'react-icons/fi';
import { FaRegComments } from 'react-icons/fa';
import { BsFilesAlt } from 'react-icons/bs';
import { MdOutlineReportProblem } from 'react-icons/md';
import { showToast } from '../../utils/toast';

const Links = () => {

  const navigate = useNavigate();

  const logoutUser = () => {
    const agree = window.confirm('Are you sure you want to logout?');
    if (!agree) { return; }
    localStorage.clear();
    showToast('Logged out successfully', 'success');
    navigate('/login');
  };
  return(
    <div className=' w-full h-screen shadow-xl'>
      <div className=' max-w-[24vw] h-screen p-4'>
        <h1 className=' text-3xl font-bold text-center mt-16 leading-[3rem]'>
          <span className='font-black text-primary grid place-items-center text-4xl tracking-tighter'>SpeakUp</span>
          <span className='text-cblack'>Dashboard</span>
        </h1>
        <Line />
        <div className=' grid place-items-center h-4/6'>
          <div className=' -mt-48' >
            <div className='w-full grid place-items-center'>
              <Link className='w-full' to='/dashboard'>
                <Button variant="ghost" className="w-full bg-transparent hover:bg-cwhite font-semibold">
                  <div className=' flex items-center gap-4 justify-start w-full'>
                    <FiHome />Home
                  </div>
                </Button>
              </Link>
              <Link className='w-full' to='/dashboard/users'>
                <Button variant="ghost" className="w-full bg-transparent hover:bg-cwhite font-semibold">
                  <div className=' flex items-center gap-4 justify-start w-full'>
                    <FiUsers />Users
                  </div>
                </Button>
              </Link>
              <Link className='w-full' to='/dashboard/confessions'>
                <Button variant="ghost" className="w-full bg-transparent hover:bg-cwhite font-semibold">
                  <div className=' flex items-center gap-4 justify-start w-full'>
                    <BsFilesAlt />Confessions
                  </div>
                </Button>
              </Link>
              <Link className='w-full' to='/dashboard/comments'>
                <Button variant="ghost" className="w-full bg-transparent hover:bg-cwhite font-semibold">
                  <div className=' flex items-center gap-4 justify-start w-full'>
                    <MdOutlineReportProblem /><FaRegComments />Comments
                  </div>
                </Button>
              </Link>

              <Link className='w-full' to='/dashboard/reportings'>
                <Button variant="ghost" className="w-full bg-transparent hover:bg-cwhite font-semibold">
                  <div className=' flex items-center gap-4 justify-start w-full'>
                    <MdOutlineReportProblem /><BsFilesAlt />Confessions
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
        </div>
      </div>
    </div>
  );
};

export default Links;