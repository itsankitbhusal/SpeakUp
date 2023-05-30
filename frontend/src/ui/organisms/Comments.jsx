import VotesBtn from '../molecules/VotesBtn';
import UserDetail from '../molecules/UserDetail';
import Text from '../atoms/Text';
import Line from '../atoms/Line';

const Comments = ({ handle, date, view, comment }) => (
  <div className='flex justify-end'>
    <div className='flex flex-col justify-start items-center w-11/12'>
      <div className='flex justify-start items-center w-full gap-4'>
        <VotesBtn view={view} small />
        <div className='flex flex-col justify-between gap-2'>
          <UserDetail handle={handle} date={date}  />
          <Text className=" text-justify text-[.8rem]" >{ comment}</Text>
        </div>
      </div>
      <Line className="w-10/12 flex justify-end" />
    </div>
  </div>
);

export default Comments;