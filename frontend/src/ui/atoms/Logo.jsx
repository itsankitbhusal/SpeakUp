import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import logoWide from '../../assets/logo-wide.svg';

const Logo = ({ wide, className }) => (
  <Link to="/">
    <img draggable="false"  className={`w-full h-full hover:cursor-pointer${ className }`}  src={wide ? logoWide: logo} alt={wide? 'SpeakUp wide logo': 'SpeakUp logo'} />
  </Link>
);



export default Logo;