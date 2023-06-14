import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { FcApproval } from 'react-icons/fc';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import { deleteConfession } from '../../services/confessions';
import { showToast } from '../../utils/toast';

const UserDetail = ({ handle, date, views, isApproved, isProfile, confessionId }) => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDotsClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleDelete = async() => {
    const confirm = window.confirm('Are you sure you want to delete this confession?');
    if (confirm) {
      // delete confession
      const response = await deleteConfession(confessionId);
      if (response.success) {
        showToast('Confession deleted successfully', 'success');
        navigate('/');
      } else {
        showToast(response.message, 'error');
      }
    }
  };
  const handleEdit = () => {
    console.log('edit: ', confessionId);
    navigate(`/edit/${ confessionId }`);
  };

  useEffect(() => {
    // after 3 seconds, close the menu
    const timeout = setTimeout(() => {
      setIsMenuOpen(false);
    }
    , 3000);
    return () => clearTimeout(timeout);

  }, [isMenuOpen]);
  return(
    <div className='flex justify-between items-center w-full'>
      <div className=' flex justify-between items-center gap-1 text-md'>
        <Text className="text-md transition-all hover:cursor-pointer hover:underline">{handle}</Text>
        <div className=' w-1 h-1 bg-secondary rounded-full my-2'></div>
        <Text className="text-md">{date}</Text>
      </div>
      <div className='flex justify-between items-center gap-1 text-secondary'>
        {views >= 0 && (
          <>
            <AiFillEye className='text-md' />
            <Text className="text-md">{views}</Text>
          </>
        )}
        {isApproved && (<FcApproval />)}
        <div className=' relative'>
          {isProfile && (
            <div onClick={handleDotsClick} className='hover:cursor-pointer hover:text-primaryDark'>
              < BsThreeDotsVertical className=' text-primary' />
            </div>
          )}
          {isMenuOpen && (
            <div id='menu' className='absolute -top-2 left-8 bg-white rounded-sm shadow-md p-2'>
              <Button variant='icon' onClick={handleEdit} className=' text-base font-normal'><AiOutlineEdit />Edit</Button>
              <Button variant='icon' onClick={handleDelete} className=' text-base font-normal'><AiOutlineDelete />Delete</Button>
              {/* <Button variant='icon' onClick={handleReport} className=' text-base font-normal'><MdOutlineReportProblem />Report</Button> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;