import React from 'react';
import Button from '../atoms/Button';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import { BiComment } from 'react-icons/bi';
import Line from '../atoms/Line';


const VotesBtn = ({ view, className, small }) => (
  <>
    <div className={`flex justify-between items-center ${ small ? 'text-xl' : 'text-3xl' } ${ className }`}>
      <div className='flex flex-col justify-between items-center text-primary '>
        <GoTriangleUp />
        <span className=' text-[.8rem] text-cblack px-2'>
          {view}
        </span>
        <GoTriangleDown />
      </div>
    </div>
  </>
);

export default VotesBtn;