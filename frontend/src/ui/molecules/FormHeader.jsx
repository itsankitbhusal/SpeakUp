import Heading from '../atoms/Heading';
import Line from '../atoms/Line';
import Logo from '../atoms/Logo';

const FormHeader = ({ className, children }) => (
  <div className=' grid place-items-center'>
    <div className='flex justify-center items-center'>
      <Logo width="64px" />
      <Heading heading='h1' className={`text-xl text-primary font-bold ${ className }`}> {children}</Heading>
    </div>
    <Line className="ml-2 w-1/2" />
  </div>
);

export default FormHeader;