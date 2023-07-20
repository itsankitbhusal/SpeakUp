import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../ui/atoms/Button';
import Line from '../../ui/atoms/Line';
import { FiHome, FiLogOut, FiUsers } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsFilesAlt } from 'react-icons/bs';
import { MdOutlineReportProblem,MdSubdirectoryArrowLeft } from 'react-icons/md';
import { showToast } from '../../utils/toast';
import { DashboardContext } from '../../context/DashboardContext';

const Links = () => {
  const navigate = useNavigate();
  const { isNavOpen, setIsNavOpen } = useContext(DashboardContext);
  const logoutUser = () => {
    const agree = window.confirm('Are you sure you want to logout?');
    if (!agree) {
      return;
    }
    localStorage.clear();
    showToast('Logged out successfully', 'success');
    navigate('/login');
  };
  
  return (
    <div className="relative w-full">
      <div className=" absolute block lg:hidden text-xl top-4 left-4 w-full">
        <Button
          variant="ghost"
          className="bg-transparent hover:bg-cwhite"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <GiHamburgerMenu  className=' text-primary' />
        </Button>
      </div>
      <div className={`w-full grid place-items-center pr-24 h-screen border:none lg:border-r-2 ${ isNavOpen ? 'block' : 'hidden' } lg:block`}>
        <div className=" max-w-[24vw] h-screen p-4">
          <h1 className=" text-3xl lg:text-2xl grid place-items-center font-bold text-center mt-16 leading-0 lg:leading-6">
            <span className="font-black text-primary grid place-items-center tracking-tighter">
              SpeakUp
            </span>
            <span className="text-cblack">Dashboard</span>
          </h1>
          <Line />
          <div className=" grid place-items-center h-4/6">
            <div className=" -mt-48">
              <div className="w-full grid place-items-center">
                <Link className="w-full my-8" to="/">
                  <Button
                    variant="outline-primary"
                    className="w-full hover:bg-cwhite font-semibold"
                  >
                    <div className=" flex items-center gap-4 justify-start w-full">
                      <MdSubdirectoryArrowLeft />
                      User's View
                    </div>
                  </Button>
                </Link>
                <Link className="w-full" to="/dashboard">
                  <Button
                    variant="ghost"
                    className="w-full bg-transparent hover:bg-cwhite font-semibold"
                  >
                    <div className=" flex items-center gap-4 justify-start w-full">
                      <FiHome />
                      Home
                    </div>
                  </Button>
                </Link>
                <Link className="w-full" to="/dashboard/users">
                  <Button
                    variant="ghost"
                    className="w-full bg-transparent hover:bg-cwhite font-semibold"
                  >
                    <div className=" flex items-center gap-4 justify-start w-full">
                      <FiUsers />
                      Users
                    </div>
                  </Button>
                </Link>
                <Link className="w-full" to="/dashboard/confessions">
                  <Button
                    variant="ghost"
                    className="w-full bg-transparent hover:bg-cwhite font-semibold"
                  >
                    <div className=" flex items-center gap-4 justify-start w-full">
                      <BsFilesAlt />
                      Confessions
                    </div>
                  </Button>
                </Link>
                <Link className="w-full" to="/dashboard/comments">
                  <Button
                    variant="ghost"
                    className="w-full bg-transparent hover:bg-cwhite font-semibold"
                  >
                    <div className=" flex items-center gap-4 justify-start w-full">
                      <MdOutlineReportProblem />
                      Comments
                    </div>
                  </Button>
                </Link>

                <Link className="w-full" to="/dashboard/reportings">
                  <Button
                    variant="ghost"
                    className="w-full bg-transparent hover:bg-cwhite font-semibold"
                  >
                    <div className=" flex items-center gap-4 justify-start w-full">
                      <MdOutlineReportProblem />
                      Confessions
                    </div>
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  className="w-full bg-transparent hover:bg-cwhite font-semibold"
                  onClick={logoutUser}
                >
                  <div className=" flex items-center gap-4 justify-start w-full">
                    <FiLogOut />
                    Logout
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Links;
