import Logo from '../atoms/Logo';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { Link } from 'react-router-dom';

const Header = () => (
  <>
    <header className='shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] '>
      <div className='flex justify-between items-center gap-4 outline rounded-sm outline-primary outline-[1.5px]'>
        <Link to='/'>
          <Logo width="150px" wide className=' ml-8' />
        </Link>
        <Input placeholder="Search..." className="bg-transparent outline-none py-0 border-none mr-2  w-[32vw]" />
        <Button className="w-[150px] rounded-l-none  text-2xl"><RxMagnifyingGlass /></Button>
      </div>
    </header>
  </>
);

export default Header;