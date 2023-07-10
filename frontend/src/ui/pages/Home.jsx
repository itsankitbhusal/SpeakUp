import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarFull from '../templates/SidebarFull';
import HomeMidFull from '../templates/HomeMidFull';
import NavFull from '../templates/NavFull';
import { ConfessionProvider } from '../../context/ConfessionContext';
import { NavbarContext } from '../../context/NavbarContext';

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // get access and refresh token from local storage
    const access = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');
    if (!refresh && !access) {
      navigate('/login');
    }
  }, []);

  const { isSidebarOpen } = useContext(NavbarContext);

  return (
    <>
      <div className='flex w-full justify-center items-center bg-cwhite'>
        <NavFull className="w-full overflow-hidden" />
        <div className='relative grid place-items-center w-full lg:justify-center lg:min-w-12/12 xl:w-auto xl:max-w-8.5/12'>
          <div className=' w-full gap-0 items-start lg:flex lg:justify-center xl:justify-evenly'>
            <div className={`${ isSidebarOpen && 'fixed top-16 right-0 h-screen' } lg:sticky top-20 h-screen w-full sm:w-6/12 md:w-4/12 flex sm:justify-center z-10 bg-cwhite top-18 lg:mt-20 ${ isSidebarOpen ? 'block': 'hidden' } pt-2 lg:flex mt-0 lg:max-w-[20vw]`}>
              <SidebarFull />
            </div>
            <div className=' lg:w-3/4 flex lg:justify-end justify-center' >
              <ConfessionProvider>
                <HomeMidFull />
              </ConfessionProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;