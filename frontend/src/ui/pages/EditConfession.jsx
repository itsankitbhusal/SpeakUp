import decode from 'jwt-decode';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { useNavigate ,useParams, Link } from 'react-router-dom';
import { showToast } from '../../utils/toast';
import { getConfessionById, updateConfessionById } from '../../services/confessions';
import { createConfessionValidationSchema } from '../../validationSchemas/createConfessionValidationSchema';
import { Mention, MentionsInput } from 'react-mentions';
import { MdArrowBackIos } from 'react-icons/md';
import Button from '../atoms/Button';
import Heading from '../atoms/Heading';
import FormField from '../molecules/FormField';
import  defaultStyle  from '../organisms/defaultStyle';
import { searchTags } from '../../services/tags';

const EditConfession = () => {
  const navigate = useNavigate();
  const [handle, setHandle] = useState('');
  const [confession, setConfession] = useState(null);
  const [isConfessionLoaded, setIsConfessionLoaded] = useState(false);
  const [initialValues, setInitialValues] = useState({
    title: 'Loading...',
    body: 'Loading...'
  });

  const { id } = useParams();

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

  const getConfession = async () => {
    const response = await getConfessionById(id);
    if (response.success) {
      setConfession(response.data);
      setIsConfessionLoaded(true);
      setInitialValues({
        title: response?.data?.title,
        body: response?.data?.body
      });
    } else {
      showToast(response.message, 'error');
    }
    
  };
  useEffect(() => {
    getConfession();
    const token = localStorage.getItem('access');
    const decodedData = decode(token);

    setHandle(decodedData?.handle);
  }, []);
  
  useEffect(() => {
    const decodedUser = decode(localStorage.getItem('access'));
    if (confession && decodedUser.handle !== confession?.user?.handle) {
      showToast('You are not authorized to edit this confession', 'error');
      navigate('/');
    }
  }, [confession, isConfessionLoaded]);
  
  useEffect(() => {
    formik.setValues(initialValues);

  }, [initialValues]);


  const validationSchema = createConfessionValidationSchema;
  
  const onSubmit = async values => {
    // update confession
    const response = await updateConfessionById(id, values);
    if (response.success) {
      showToast('Confession updated successfully', 'success');
      navigate('/');
    } else {
      showToast('Something went wrong', 'error');
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });
  
  return (
    <div className='relative grid place-items-center mx-[20vw] h-screen'>
      <form className='relative w-full' onSubmit={formik.handleSubmit}>
        <div className='absolute w-full inset-0 top-16 mt-1 z-0'>
          <Link to={`/profile/${ handle }`}>
            <Button variant="ghost" ><MdArrowBackIos />Back</Button>
          </Link>
        </div>
        <div className=' my-16'>
          <Heading heading={'h3'} className='text-center'>Edit Confession</Heading>
        </div>
        <div className=' grid place-items-center w-full h-full'>
          <div className='w-full'>
            <FormField
              id="confessionTitle"
              label="Confession Title"
              placeholder="Enter Confession Title"
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
              className="w-full font-semibold"
              error={formik?.errors?.title}
            />
          </div>
          {/* <div className=' w-full max-h-screen'>
            <FormField
              textArea
              big
              id="confessionBody"
              label="Confession Body"
              placeholder="Enter Confession Body"
              name="body"
              onChange={formik.handleChange}
              value={formik.values.body}
              className="w-full"
              error={formik?.errors?.body}
            />
          </div> */}
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
        </div>
        <div className='w-full my-8 grid place-items-center'>
          <Button variant="primary" className="w-1/2 z-50" type="submit"> Update Confession</Button>
        </div>
      </form>
    </div>
  );
};

export default EditConfession;