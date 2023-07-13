import { Link } from 'react-router-dom';
import logoWide from '../../assets/logo-wide.svg';
import logo from '../../assets/logo.svg';

const Logo = ({ small }) => (
  <Link to="/">
    <div className=" flex justify-center items-center">
      {small ? (
        <img
          draggable="false"
          className="h-full hover:cursor-pointer left-0 -ml-6 w-20 md:w-24"
          src={logo}
          alt="SpeakUp logo"
        />
      ) : (
        <img
          draggable="false"
          className={'w-full h-full hover:cursor-pointer'}
          src={logoWide}
          alt={'SpeakUp logo'}
        />
      )}
    </div>
  </Link>
);

export default Logo;
