import Logo from '../atoms/Logo';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className='grid place-items-center'>
    <div className='flex w-[95vw] sm:w-auto lg:w-8/12 justify-between gap-4 outline rounded-sm outline-primary outline-[1.5px]'>
      <div className='flex items-center'>
        <Link to='/'>
          <div className='max-h-[48px] max-w-[70px] sm:max-h-[48px] sm:ml-0 ml-4 sm:max-w-[80px] md:max-w-[150px] xl:min-h-[48px] flex gap-2 justify-center items-center'>
            <Logo />
          </div>
        </Link>
      </div>
      <Input placeholder="Search..." className="bg-transparent outline-none border-none w-[32vw]" />
      <div className='sm:min-w-0 xl:min-w-[150px] transition-all'>
        <Button className="w-full h-full rounded-l-none text-2xl items-end"><RxMagnifyingGlass /></Button>
      </div>
    </div>
  </header>



);

export default Header;