import { useEffect, useState } from 'react';
import decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { MdOutlineReportProblem } from 'react-icons/md';
import { FcApproval } from 'react-icons/fc';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import { deleteConfession } from '../../services/confessions';
import { deleteCommentById } from '../../services/comments';
import { createReport } from '../../services/report';
import { showToast } from '../../utils/toast';

const UserDetail = ({ handle, date, views, isApproved, isProfile, confessionId, commentId, isComment }) => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReportMenuOpen, setIsReportMenuOpen] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportMessage, setReportMessage] = useState('');
  

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.handle === handle) {
        setIsUser(true);
      }
    }
  }, []);

  const handleDotsClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleBtnClick = () => {
    setIsReportMenuOpen(!isReportMenuOpen);
  };

  const handleReport = async () => {
    setIsModalOpen(true);
    if (!reportMessage) {
      return;
    }
    if (confessionId) {
      const reportData = {
        'reportType': 'confession',
        confessionId,
        'description': reportMessage
      };
      if (reportData.description) {
        const response = await createReport(reportData );
        if (response.success) {
          showToast('Report submitted successfully', 'success');
          setIsModalOpen(false);
        } else {
          showToast(response.message, 'error');
        }
      }
    } else  {
      const reportData = {
        'reportType': 'comment',
        commentId,
        'description': reportMessage
      };
      if (reportData.description) {
        const response = await createReport(reportData );
        if (response.success) {
          showToast('Report submitted successfully', 'success');
          setIsModalOpen(false);
        } else {
          showToast(response.message, 'error');
        }
      }
    }
   

  };
  
  const handleDelete = async() => {
    const confirm = window.confirm('Are you sure you want to delete this confession?');
    if (isComment) {
      if (confirm) {
        const response = await deleteCommentById(commentId);
        if (response.success) {
          showToast('Comment deleted successfully', 'success');
          navigate('/');
        } else {
          showToast(response.message, 'error');
        }
      }
    } else {
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
    }
  };
  const handleEdit = () => {
    navigate(`/edit/${ confessionId }`);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMenuOpen(false);
      setIsReportMenuOpen(false);
    }
    , 3000);
    return () => clearTimeout(timeout);

  }, [isMenuOpen, isReportMenuOpen]);

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
          {isUser ? (
            <div onClick={handleDotsClick} className='hover:cursor-pointer hover:text-primaryDark'>
              < BsThreeDotsVertical className=' text-primary' />
            </div>
          ) : !isUser && (
            <div onClick={handleBtnClick} className='hover:cursor-pointer hover:text-primaryDark'>
              < BsThreeDotsVertical className=' text-primary' />
            </div>
          )}
          {isMenuOpen && (
            <div id='menu' className='absolute -top-2 left-8 bg-inherit rounded-sm shadow-md p-2'>
              {
                !isComment && (
                  <Button variant='icon' onClick={handleEdit} className=' text-base font-normal'><AiOutlineEdit />Edit</Button>
                )
              }
              <Button variant='icon' onClick={handleDelete} className=' text-base font-normal'><AiOutlineDelete />Delete</Button>
            </div>
          )}
          {isReportMenuOpen &&  (
            <div id='menu' className='absolute -top-2 left-8 bg-inherit rounded-sm shadow-md p-2'>
              <Button variant='icon' onClick={handleReport} className=' text-base font-normal'><MdOutlineReportProblem />Report</Button>
            </div>
          )}
          {
            isModalOpen && (
              <div className='fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
                <div className='w-5/12 bg-inherit rounded-sm shadow-md p-4'>
                  <Text className='text-lg font-semibold'>{confessionId ? 'Report Confession': 'Report Comment'}</Text>
                  <Text className='text-sm'>Please enter a message to report this { confessionId ? 'confession': 'comment'}</Text>
                  <textarea onChange={e => setReportMessage(e.target.value)} className='w-full h-32 border border-gray-300 rounded-sm p-2 mt-2' placeholder='Enter message here...'></textarea>
                  <div className='flex justify-end gap-2 mt-2'>
                    <Button variant='secondary' onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    <Button variant='primary' onClick={handleReport}>Submit</Button>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default UserDetail;