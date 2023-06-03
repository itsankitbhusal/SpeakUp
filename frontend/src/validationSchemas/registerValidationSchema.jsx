import * as Yup from 'yup';

export const registerValidationSchema = Yup.object({
  handle: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required').min(8, 'Must be 8 characters or more').max(15, 'Must be 15 characters or less'),
  cpassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  // check if terms is checked or not
  terms: Yup.boolean().oneOf([true], 'Accept Terms & Conditions is required')
});