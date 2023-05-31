import Header from '../molecules/Header';

const Navbar = () => (
  <>
    <div className='fixed top-0 w-full h-8 bg-white opacity-90'></div>
    <div className='fixed top-8 z-10 bg-cwhite'>
      <Header />
    </div>
  </>
);

export default Navbar;