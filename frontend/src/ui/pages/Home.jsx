import SidebarFull from '../templates/SidebarFull';
import HomeMidFull from '../templates/HomeMidFull';
import NavFull from '../templates/NavFull';
const Home = () => (
  <>
    <div className=' flex justify-center items-center'>
      <NavFull />
      <div className=' grid place-items-center'>
        <div className=' flex w-full justify-evenly gap-0 items-start'>
          <div className='sticky top-20 w-1/4 mt-20 pt-2  flex justify-start'>
            <SidebarFull />
          </div>
          <div className=' w-3/4 flex justify-end' >
            <HomeMidFull />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Home;