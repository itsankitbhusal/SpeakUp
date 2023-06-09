import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../atoms/Input';
import { createComment } from '../../services/comments';
import { showToast } from '../../utils/toast';

const WriteComment = ({ confessionId }) => {
  const commentSchema = Yup.object().shape({
    body: Yup.string()
      .min(10, 'Too Short!')
      .max(150, 'Too Long!')
      .required('Required')
  });
  const formik = useFormik({
    initialValues: {
      body: ''
    },
    validationSchema: commentSchema,
    onSubmit: async values => {
      console.log(values);
      // make api request to create comment
      if (values) {
        const response = await createComment(values, confessionId);
        if (response.success) {
          showToast('Comment created successfully', 'success');
          formik.resetForm();
        } else {
          showToast(response.message, 'error');
        }
      }
    }
  });
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      formik.handleSubmit();
    }
  };
  return(
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex justify-end ml-2 relative">
          <Input onChange={formik.handleChange}
            value={formik.values.body}
            name="body"
            onKeyDown={handleKeyDown}
            placeholder="Write a comment" className="w-11/12 outline outline-1 outline-primary" />
          <span className=' absolute top-0 text-danger italic text-sm px-1'>{formik.errors?.body}</span>
        </div>
      </form>
    </>
  );
};

export default WriteComment;