import RegisterFields from '../organisms/RegisterFields';
import FormHeader from '../molecules/FormHeader';

const RegisterTemp = () => (
  
  <div className=' grid place-items-center min-h-screen'>
    <div className=' grid place-items-center gap-10 px-16 py-8 rounded-sm shadow-2xl'>
      <FormHeader  > User Registration </FormHeader>
      <RegisterFields />
    </div>
  </div>
  
);

export default RegisterTemp;