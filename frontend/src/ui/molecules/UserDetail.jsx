import { AiFillEye } from 'react-icons/ai';
import Text from '../atoms/Text';

const UserDetail = ({ handle, date, views }) => (
  <div className='flex justify-between items-center w-full'>
    <div className=' flex justify-between items-center gap-1 text-md'>
      <Text className="text-md transition-all hover:cursor-pointer hover:underline">{handle}</Text>
      <div className=' w-1 h-1 bg-secondary rounded-full my-2'></div>
      <Text className="text-md">{date}</Text>
    </div>
    <div className='flex justify-between items-center gap-1 text-secondary'>
      {views >=0 && (
        <>
          <AiFillEye className='text-md' />
          <Text className="text-md">{views}</Text>
        </>
      )}
    </div>
  </div>
);

export default UserDetail;