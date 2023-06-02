import FormField from '../molecules/FormField';
import Button from '../atoms/Button';

const LoginFields = () => (
  <div className=' grid place-items-center gap-4 '>
    <FormField id="uname" type="text" placeholder="Enter handle" label="Handle" />
    <FormField id="password" type="password" placeholder="Enter password" label="Password" />
    <div className=' mt-4 mb-8 w-full flex justify-end'>
      <Button variant="primary" className=" w-2/3 py-3" >Login</Button>
    </div>
  </div>
);

export default LoginFields;