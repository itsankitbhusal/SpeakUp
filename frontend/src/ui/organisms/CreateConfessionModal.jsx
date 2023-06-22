import { useEffect, useContext } from 'react';
import { Mention, MentionsInput } from 'react-mentions';

import { ModalContext } from '../../context/ModalContext';
import Modal from '../molecules/Modal';
import { createConfession } from '../../services/confessions';
import { showToast } from '../../utils/toast';
import { useFormik } from 'formik';
import { createConfessionValidationSchema } from '../../validationSchemas/createConfessionValidationSchema';

import FormField from '../molecules/FormField';
import { searchTags } from '../../services/tags';

import defaultStyle from './defaultStyle';

const CreateConfessionModal = ({ preserveData, setPreserveData }) => {
  // context data to close modal
  const { CloseModal } = useContext(ModalContext);

  const searchTagDatas = async (query, callback) => {
    if (!query) { return; }
    
    const response = await searchTags(query);
    if (response.success) {
      const suggestions = { id: query, display: query };
      const tagArray = response.data.map(tag => ({
        id: tag.id,
        display: tag.name
      }));
      return callback([...tagArray, suggestions]);
    } else {
      callback([{ id: query, display: query }]);
    }
  };

  // initial values
  const initialValues = {
    title: '',
    body: ''
  };
  // validation schema for confession title and body
  const validationSchema = createConfessionValidationSchema;

  // on submit function to handle form submission
  const onSubmit = async (values, { resetForm }) => {
    // console.log(values);
    // return;
    const response = await createConfession(values);
    if (response.success) {
      resetForm({ values: initialValues });
      setPreserveData(null);
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
    <>
      <form onSubmit={formik.handleSubmit}>
        <Modal title="Create Confession" showSaveButton showCancelButton>
          <div className="p-4 flex flex-col gap-2 ">
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
            {/* <FormField
              textArea={true}
              id="confessionBody"
              label="Confession Body"
              placeholder="Enter Confession Body"
              name="body"
              value={formik.values.body}
              onChange={formik.handleChange}
              className="w-full"
              error={formik?.errors?.body}
            /> */}
            <div className='overflow-y-auto max-h-[60vh]'>
              <label htmlFor="confessionBody" className='text-[.9rem] text-secondaryLight'>Confession Body</label>
              <MentionsInput
                id='confessionBody'
                value={formik.values.body}
                name="body"
                placeholder='Enter Confession Body'
                onChange={e => {
                  formik.setFieldValue('body', e.target.value);
                }}
                style={defaultStyle}
              >
                <Mention
                  trigger="#"
                  data={searchTagDatas}
                  markup='#[__display__](__id__)'
                  className=' bg-accentLight'
                  appendSpaceOnAdd={true}
                />
              </MentionsInput>
            </div>
            <span className='text-danger text-sm italic w-full flex justify-end items-center '>{formik?.errors?.body}</span>
          </div>
        </Modal>
      </form>
    </>
  );
};

export default CreateConfessionModal;
