import * as Yup from 'yup';

export const registerValidationSchema = Yup.object({
  handle: Yup.string()
    .matches(/^[a-zA-Z]+([a-zA-Z0-9]{4,30})$/, 'Invalid username')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email address')
    .matches(
      /^[a-zA-Z][_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z][_a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/,
      'Invalid email address'
    )
    .required('Required'),
  password: Yup.string()
    .required('Required')
    .min(8, 'Must be 8 characters or more')
    .max(30, 'Must be 30 characters or less'),
  cpassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  // check if terms is checked or not
  terms: Yup.boolean().oneOf([true], 'Accept Terms & Conditions is required')
});
