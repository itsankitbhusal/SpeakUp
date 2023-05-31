import SidebarLinks from './ui/molecules/SidebarLinks';
import HomePage from './ui/templates/HomePage';

const App = () => (
  <div className='flex min-h-screen justify-center gap-8'>
    <div className=' w-[20vw] bg-cwhite min-h-screen mt-32'>
      <SidebarLinks />
    </div>
    <HomePage />
  </div>
);

export default App;