import * as Yup from 'yup';

export const createConfessionValidationSchema = Yup.object({
  title: Yup.string().required('Required').trim().max(150, 'Must be 150 characters or less')
  ,body: Yup.string().required('Required').trim().max(1000, 'Must be 1000 characters or less')
});
