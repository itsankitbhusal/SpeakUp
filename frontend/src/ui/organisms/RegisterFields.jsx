import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';

import FormField from '../molecules/FormField';
import Checkbox from '../molecules/Checkbox';
import Button from '../atoms/Button';
import { registerValidationSchema } from '../../validationSchemas/registerValidationSchema';
import { register } from '../../services/auth';

import { showToast } from '../../utils/toast';

const RegisterFields = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      handle: '',
      email: '',
      password: '',
      cpassword: '',
      terms: false
    },
    validationSchema: registerValidationSchema,
    onSubmit: async values => {
      try {
        const response = await register(values);
        if (response.success) {
          localStorage.setItem('refresh', response.data.refreshToken);
          localStorage.setItem('access', response.data.accessToken);
          showToast('Registered successfully', 'success');
          navigate('/');
        }
        if (!response.success) {
          showToast(response.message, 'error');
        }
      } catch (error) {
        console.error(error);
      }
    }
  });
  const handleCheckboxChange = event => {
    const { checked } = event.target;
    formik.setFieldValue('terms', checked);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid place-items-center gap-4">
        <FormField
          id="handle"
          type="text"
          placeholder="Enter handle"
          label="Handle"
          {...formik.getFieldProps('handle')}
          error={formik.touched.handle && formik.errors.handle}
        />
        <FormField
          id="email"
          type="email"
          placeholder="Enter email"
          label="Email"
          {...formik.getFieldProps('email')}
          error={formik.touched.email && formik.errors.email}
        />
        <FormField
          id="password"
          type="password"
          placeholder="Enter password"
          label="Password"
          {...formik.getFieldProps('password')}
          error={formik.touched.password && formik.errors.password}
        />
        <FormField
          id="cpassword"
          type="password"
          placeholder="Enter confirm password"
          label="Confirm Password"
          {...formik.getFieldProps('cpassword')}
          error={formik.touched.cpassword && formik.errors.cpassword}
        />

        <div>
          <Checkbox
            id="terms"
            label="Accept Terms and Conditions"
            name="terms"
            checked={formik.values.terms}
            onChange={handleCheckboxChange}
            onBlur={formik.handleBlur}
            error={formik.touched.terms && formik.errors.terms}
          />
        </div>
        <div className="mt-4 mb-8 w-full flex justify-end">
          <div className="w-full flex flex-col items-end">
            <Button type="submit" variant="primary" className="w-full py-3">
              Register
            </Button>
            <div className="w-full flex text-md justify-end mt-3">
              <Link to="/login" className="text-primary hover:underline">
                Already have an account?{' '}
                <span className=" font-semibold">Login here</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterFields;
