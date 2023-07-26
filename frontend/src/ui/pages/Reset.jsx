import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import Heading from '../atoms/Heading';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import { showToast } from '../../utils/toast';
import { resetValidationSchema } from '../../validationSchemas/resetValidationSchema';
import { resetPassword } from '../../services/emails';

const Reset = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [formData, setFormData] = useState({
    password: '',
    cpassword: ''
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      cpassword: ''
    },
    validationSchema:  resetValidationSchema,
    onSubmit: async values => {
      try {
        const response = await resetPassword(token, values);
        if (response?.success) {
          showToast('Password reset successfully', 'success');
          localStorage.clear();
          navigate('/login');
        } else {
          showToast('Password reset failed', 'error');
        }
      } catch (error) {
        console.error(error);
      }
    }
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <div className=' grid place-items-center w-screen h-screen'>
        <div>
          <Heading > Reset Password </Heading>
          {/* password and new password form fields */}
          <form onSubmit={formik.handleSubmit} className='w-full max-w-sm my-8'>
            <div className='flex items-center mb-6'>
              <div className='w-full grid gap-4'>
                <FormField
                  {...formik.getFieldProps('password')}
                  error={formik.touched.password && formik.errors.password}
                  id="password" onChange={formik.handleChange} label='New Password' type='password' placeholder="Enter new password" name="password" />
                <FormField
                  {...formik.getFieldProps('cpassword')}
                  error={formik.touched.cpassword && formik.errors.cpassword}
                  id="cpassword" onChange={formik.handleChange} label='Confirm Password' type='password' placeholder="Enter confirm password" name="cpassword" />
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
