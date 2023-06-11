import { useEffect, useContext } from 'react';
import { ModalContext } from '../../context/ModalContext';
import Modal from '../molecules/Modal';
import { createConfession } from '../../services/confessions';
import { showToast } from '../../utils/toast';
import { useFormik } from 'formik';
import { createConfessionValidationSchema } from '../../validationSchemas/createConfessionValidationSchema';

import FormField from '../molecules/FormField';

const CreateConfessionModal = ({ preserveData, setPreserveData }) => {
  // context data to close modal
  const { CloseModal } = useContext(ModalContext);

  // initial values
  const initialValues = {
    title: '',
    body: ''
  };
  // validation schema for confession title and body
  const validationSchema = createConfessionValidationSchema;

  // on submit function to handle form submission
  const onSubmit = async (values, { resetForm }) => {
    const response = await createConfession(values);
    if (response.success) {
      resetForm({ values: initialValues });
      showToast('Confession created successfully', 'success');
      CloseModal();
    } else {
      showToast('Something went wrong', 'error');
    }
  };

  // using formik for form validation and submission
  const formik = useFormik({
    initialValues: preserveData || initialValues,
    validationSchema,
    onSubmit
  });
  useEffect(() => {
    // set title and body values to preserveData
    setPreserveData(formik.values);
  }, [formik.values]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Modal title="Create Confession" showSaveButton showCancelButton>
        <div className=" p-4 flex flex-col gap-2 ">
          <FormField
            id="confessionTitle"
            label="Confession Title"
            placeholder="Enter Confession Title"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
            className="w-full"
            error={formik?.errors?.title}
          />

          <FormField
            textArea
            id="confessionBody"
            label="Confession Body"
            placeholder="Enter Confession Body"
            name="body"
            onChange={formik.handleChange}
            value={formik.values.body}
            className="w-full"
            error={formik?.errors?.body}
          />
        </div>
      </Modal>
    </form>
  );
};

export default CreateConfessionModal;
