import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Heading from '../atoms/Heading';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import { showToast } from '../../utils/toast';
import { resetPassword } from '../../services/emails';

const Reset = () => {
  const navigate = useNavigate();
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

    // call api to reset password
    try {
      const response = await resetPassword(token, { password: formData.password });
      if (response?.success) {
        const { accessToken, refreshToken } = response.data;
        showToast('Password reset successfully', 'success');
        localStorage.setItem('access', accessToken);
        localStorage.setItem('refresh', refreshToken);
        navigate('/');
      } else {
        showToast('Password reset failed', 'error');
      }
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
                <FormField id="password" onChange={handleChange} label='New Password' type='password' placeholder="Enter new password" name="password" />
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
