import React from 'react';
import { useParams } from 'react-router-dom';

const Tag = () => {
  const { tag } = useParams();
  return(
    <div className=' h-screen text-center grid place-items-center'>
      <h1 className=' text-2xl bg-primaryLight rounded-sm text-center inline px-6 py-4'>Tag: { tag }</h1>
    </div>
  );
};

export default Tag;