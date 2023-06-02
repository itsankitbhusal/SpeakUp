import LoginFields from '../organisms/LoginFields';
import FormHeader from '../molecules/FormHeader';

const LoginTemp = () => (
  
  <div className=' grid place-items-center min-h-screen'>
    <div className=' grid place-items-center gap-10 px-16 py-8 rounded-sm shadow-2xl'>
      <FormHeader  className="">User Login </FormHeader>
      <LoginFields />
    </div>
  </div>
  
);

export default LoginTemp;