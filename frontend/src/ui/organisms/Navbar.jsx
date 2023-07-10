import Header from '../molecules/Header';

const Navbar = ({ className }) => (
  <>
    <div className={`sm:min-w-screen w-screen bg-inherit z-10 pt-0 lg:pt-4 fixed top-0 mx-auto ${ className }`}>
      <div className='mx-auto'>
        <Header />
      </div>
    </div>
  </>
);

export default Navbar;