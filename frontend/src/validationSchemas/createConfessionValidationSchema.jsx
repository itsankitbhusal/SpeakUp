import * as Yup from 'yup';

export const createConfessionValidationSchema = Yup.object({
  title: Yup.string().required('Required').trim().max(150, 'Must be 150 characters or less')
  ,body: Yup.string().required('Required').trim().max(3000, 'Must be 3000 characters or less')
});
