import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarFull from '../templates/SidebarFull';
import HomeMidFull from '../templates/HomeMidFull';
import NavFull from '../templates/NavFull';
import { ConfessionProvider } from '../../context/ConfessionContext';
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


  return(
    <>
      <div className=' flex justify-center items-center bg-cwhite'>
        <NavFull />
        <div className=' grid place-items-center w-8.5/12'>
          <div className=' flex w-full justify-evenly gap-0 items-start'>
            <div className='sticky top-20 w-1/4 mt-20 pt-2'>
              <SidebarFull />
            </div>
            <div className=' w-3/4 flex justify-end' >
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