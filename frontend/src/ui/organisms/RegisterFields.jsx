import FormField from '../molecules/FormField';
import Checkbox from '../molecules/Checkbox';
import Button from '../atoms/Button';

const RegisterFields = () => (
  <div className=' grid place-items-center gap-4 '>
    <FormField id="uname" type="text" placeholder="Enter handle" label="Handle" />
    <FormField id="email" type="email" placeholder="Enter email" label="Email" />
    <FormField id="password" type="password" placeholder="Enter password" label="Password" />
    <FormField id="cpassword" type="password" placeholder="Enter confirm password" label="Confirm Password" />
    <div>
      <Checkbox />
    </div>
    <div className=' mt-4 mb-8 w-full flex justify-end'>
      <Button variant="primary" className=" w-2/3 py-3" >Register</Button>
    </div>
  </div>
);

export default RegisterFields;