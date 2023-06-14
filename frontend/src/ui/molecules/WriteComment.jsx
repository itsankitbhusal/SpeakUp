import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../atoms/Input';
import { createComment } from '../../services/comments';
import { showToast } from '../../utils/toast';
import { useContext } from 'react';
import { CommentContext } from '../../context/CommentContext';

const WriteComment = ({ confessionId }) => {
  const { addComment } = useContext(CommentContext);
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
      // make api request to create comment
      if (values) {
        const response = await createComment(values, confessionId);
        if (response.success) {
          showToast('Comment created successfully', 'success');
          addComment(values);
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
      <form className='w-full bg-red-200' onSubmit={formik.handleSubmit}>
        <div className="flex justify-end relative z-0">
          <Input onChange={formik.handleChange}
            value={formik.values.body}
            name="body"
            onKeyDown={handleKeyDown}
            placeholder="Write a comment" className="w-full outline outline-1 outline-primary" />
          <span className=' absolute top-0 text-danger italic text-sm px-1'>{formik.errors?.body}</span>
        </div>
      </form>
    </>
  );
};

export default WriteComment;