import Heading from '../atoms/Heading';
import Line from '../atoms/Line';
import Logo from '../atoms/Logo';

const FormHeader = ({ className, children }) => (
  <div className=' grid place-items-center'>
    <div className='flex items-center justify-center'>
      <Logo small />
      <Heading heading='h1' className={`text-lg md:text-xl text-primary font-bold ${ className }`}> {children}</Heading>
    </div>
    <Line className="w-full" />
  </div>
);

export default FormHeader;