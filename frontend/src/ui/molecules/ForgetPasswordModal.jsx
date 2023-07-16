import { useState } from 'react';
import { GrClose } from 'react-icons/gr';
import Button from '../atoms/Button';
import FormField from './FormField';

const ForgetPasswordModal = ({ setForgetPassword }) => {
  const [formData, setFormData] = useState({
    handle: '',
    email: ''
  });
  const handleInputChange = e => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
  const handleForgetSubmit = e => {
    e.preventDefault();
    console.log(formData);
  };
  return(
    <>
      <form className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center' onSubmit={handleForgetSubmit} >
        <div className='relative bg-white w-1/2 h-1/2 rounded-lg flex flex-col justify-center items-center'>
          <div className='absolute top-0 right-0 mt-4 mr-4 text-2xl hover:cursor-pointer' onClick={() => setForgetPassword(false)}><GrClose /></div>
          <div className='text-2xl font-semibold'>Forget Password</div>
          <div className='text-md font-semibold mt-4'>Enter your handle and email</div>
          <div className='w-3/4 mt-4 grid gap-4'>
            <FormField onChange={handleInputChange} value={formData.handle} id='handle' type='text' placeholder='Enter handle' label='Handle' />
            <FormField onChange={handleInputChange} value={formData.email} id='email' type='email' placeholder='Enter email' label='Email' />
          </div>
          <div className='flex justify-end mt-8 w-3/4 gap-4'>
            <Button onClick={() => setForgetPassword(false)} variant='outline-secondary' className='px-4 py-2 ml-4'>Cancel</Button>
            <Button type="submit" variant='primary' className='px-4 py-2'>Send</Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ForgetPasswordModal;