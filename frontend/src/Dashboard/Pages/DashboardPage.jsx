import Home from '../Templates/Home';
import Links from '../compoenents/Links';

const DashboardPage = () => (
  <div className=' flex mt-8 mx-[10vw]'>
    <div>
      <Links />
    </div>
    <div className='w-full grid place-items-center'>
      <Home />
    </div>
  </div>
);

export default DashboardPage;