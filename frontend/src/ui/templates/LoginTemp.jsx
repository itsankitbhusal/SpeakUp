import LoginFields from '../organisms/LoginFields';
import FormHeader from '../molecules/FormHeader';

const LoginTemp = () => (
  
  <div className='grid place-items-center min-h-screen '>
    <div className='grid place-items-center gap-10 px-2 sm:px-8 lg:px-16 py-2 sm:py-4 lg:py-8 rounded-sm sm:shadow-lg md:shadow-xl shadow-none lg:shadow-2xl'>
      <FormHeader  className="">User Login </FormHeader>
      <LoginFields />
    </div>
  </div>
  
);

export default LoginTemp;