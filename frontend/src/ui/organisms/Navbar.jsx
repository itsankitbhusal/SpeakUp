import Header from '../molecules/Header';

const Navbar = ({ className }) => (
  <>
    <div className={` bg-white w-full opacity-95 pt-8 fixed top-0 mx-auto ${ className }`}>
      <div className='  max-w-[60vw] mx-auto'>
        <Header />
      </div>
    </div>
  </>
);

export default Navbar;