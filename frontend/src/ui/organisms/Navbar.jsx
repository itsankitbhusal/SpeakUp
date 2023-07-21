import Header from '../molecules/Header';

const Navbar = ({ className }) => (
  <>
    <div className={`z-10 pt-0 lg:pt-4 bg-cwhite fixed top-0 mx-auto ${ className }`}>
      <div className='grid place-items-center'>
        <Header />
      </div>
    </div>
  </>
);

export default Navbar;