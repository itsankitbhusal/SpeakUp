import Logo from '../atoms/Logo';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { Link } from 'react-router-dom';

const Header = () => (
  <>
    <header className='  '>
      <div className='flex justify-between items-center gap-4 outline rounded-sm outline-primary outline-[1.5px]'>
        <Link to='/'>
          <div className='ml-2 w-[150px] max-h-[48px] flex gap-2 justify-center items-center'>
            <Logo wide />
          </div>
        </Link>
        <div className=' flex'>
          <Input placeholder="Search..." className="bg-transparent outline-none py-0 border-none mr-2  w-[32vw]" />
          <div className=' min-w-[150px]'>
            <Button className="w-full h-full rounded-l-none text-2xl items-end"><RxMagnifyingGlass /></Button>
          </div>
        </div>
      </div>
    </header>
  </>
);

export default Header;