import Logo from '../atoms/Logo';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { RxMagnifyingGlass } from 'react-icons/rx';

const Header = () => (
  <>
    <header className='w-[60vw]'>
      <div className='flex justify-between items-center gap-4 outline rounded-sm outline-primary outline-[1.5px]'>
        <Logo width="150px" wide className=' object-cover ml-8' />
        <Input placeholder="Search..." className="bg-transparent outline-none py-0 border-none mr-2  w-[32vw]" />
        <Button className="py-2 border-none w-[150px] rounded-l-none  text-3xl flex justify-center items-center"><RxMagnifyingGlass /></Button>
      </div>
    </header>
  </>
);

export default Header;