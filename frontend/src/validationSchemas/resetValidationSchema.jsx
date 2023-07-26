import * as Yup from 'yup';

export const resetValidationSchema = Yup.object({
  password: Yup.string()
    .required('Required')
    .min(8, 'Must be 8 characters or more')
    .max(30, 'Must be 30 characters or less'),
  cpassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required')
});
