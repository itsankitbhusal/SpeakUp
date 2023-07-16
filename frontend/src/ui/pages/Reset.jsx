import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Heading from '../atoms/Heading';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import { showToast } from '../../utils/toast';
import { resetPassword } from '../../services/emails';

const Reset = () => {
  const { token } = useParams();
  const [formData, setFormData] = useState({
    password: '',
    cpassword: ''
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // check if password and confirm password are same
    if (formData.password !== formData.cpassword) {
      showToast('Password and confirm password should be same', 'error');
      return;
    }
    console.log(formData);

    // call api to reset password
    try {
      const response = await resetPassword(token, formData.password);
      console.log(response);
    } catch (error) {
      console.error(error);
    }

  };
  return (
    <>
      <div className=' grid place-items-center w-screen h-screen'>
        <div>
          <Heading > Reset Password </Heading>
          {/* password and new password form fields */}
          <form onSubmit={handleSubmit} className='w-full max-w-sm my-8'>
            <div className='flex items-center mb-6'>
              <div className='w-full grid gap-4'>
                <FormField id="password" onChange={handleChange} label='Password' type='password' placeholder="Enter new password" name="password" />
                <FormField id="cpassword" onChange={handleChange} label='Confirm Password' type='password' placeholder="Enter confirm password" name="cpassword" />
                <Button className="mt-4" variant="primary" type='submit'>Reset Password</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Reset;
