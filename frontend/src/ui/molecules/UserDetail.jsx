import React from 'react';
import { AiFillEye } from 'react-icons/ai';
import Text from '../atoms/Text';

const UserDetail = ({ handle, date, views }) => (
  <div className='flex justify-between items-center w-full'>
    <div className=' flex justify-between items-center gap-1'>
      <Text>{handle}</Text>
      <div className=' w-1 h-1 bg-secondary rounded-full my-2'></div>
      <Text>{date}</Text>
    </div>
    <div className='flex justify-between items-center gap-1'>
      {views && (
        <>
          <AiFillEye />
          <Text>{views}</Text>
        </>
      )}
    </div>
  </div>
);

export default UserDetail;