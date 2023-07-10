import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import logoWide from '../../assets/logo-wide.svg';

const Logo = () => (
  <div className=' flex justify-center items-center'>
    <img draggable="false"  className={'w-full h-full hover:cursor-pointer'}  src={logoWide} alt={'SpeakUp wide logo'} />
  </div>
);



export default Logo;