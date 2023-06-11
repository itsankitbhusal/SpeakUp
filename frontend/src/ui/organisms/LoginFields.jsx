import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import { showToast } from '../../utils/toast';
import { loginValidationSchema } from '../../validationSchemas/loginValidationSchema';
import { login } from '../../services/auth';

const LoginFields = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      handle: '',
      password: ''
    },
    validationSchema: loginValidationSchema,
    onSubmit: async values => {
      const response = await login(values);
      if (response.success) {
        // set the refresh in local storage
        localStorage.setItem('refresh', response.data.refreshToken);
        // set access token in local storage
        localStorage.setItem('access', response.data.accessToken);
        
        // show toast
        showToast('Logged in successfully', 'success');

        // navigate to home page
        navigate('/');
      }
      if (!response.success) {
        showToast(response.message, 'error');
      }
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className=" grid place-items-center gap-4 ">
        <FormField
          id="handle"
          type="text"
          placeholder="Enter handle"
          label="Handle"
          {...formik.getFieldProps('handle')}
          error={formik.touched.handle && formik.errors.handle}
        />
        <FormField
          id="password"
          type="password"
          placeholder="Enter password"
          label="Password"
          {...formik.getFieldProps('password')}
          error={formik.touched.password && formik.errors.password}
        />
      
        <div className=" mt-4 mb-8 w-full flex justify-end">
          <div className='w-full flex flex-col items-end'>
            <Button type="submit" variant="primary" className=" w-full py-3">
            Login
            </Button>
            <div className="w-full flex text-md justify-end mt-3">
              <Link to="/register" className="text-primary hover:underline">
         Don't have an account? <span className=' font-semibold'>Register here</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginFields;
