import Logo from '../atoms/Logo';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { NavbarContext } from '../../context/NavbarContext';


const Header = () => {
  const { handleSidebar } = useContext(NavbarContext);

  return(
    <header className='grid place-items-center'>
      <div className='flex w-[95vw] sm:w-[80vw] lg:w-[60vw] justify-between gap-0 md:gap-4 outline rounded-sm outline-primary outline-[1.5px] my-4'>
        <div className='flex items-center '>
          <Link to='/'>
            <div className='max-w-[100px] sm:max-w-[150px] sm:max-h-[48px] ml-2 flex gap-2 justify-center items-center'>
              <Logo />
            </div>
          </Link>
        </div>
        <Input placeholder="Search..." className={'bg-inherit outline-none border-none w-[28vw] sm:w-[32vw] '} />
        <Button onClick={handleSidebar} className="text-primary text-base sm:text-xl lg:hidden ">
          <GiHamburgerMenu />
        </Button>
        <div className='sm:min-w-0 xl:min-w-[150px] transition-all hidden lg:block'>
          <Button className="w-full h-full flex rounded-l-none text-2xl"><RxMagnifyingGlass /></Button>
        </div>
      </div>
    </header>
  );
};

export default Header;