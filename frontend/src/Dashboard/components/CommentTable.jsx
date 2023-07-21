import { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { RiDeleteBin7Line } from 'react-icons/ri';

import { getReportByType, resolveCommentReport } from '../../services/report';
import { dateConverter } from '../../utils/dateConverter';
import { deleteCommentById } from '../../services/comments';
import { showToast } from '../../utils/toast';

const CommentTable = () => {
  const [comments, setComments] = useState([]);

  // get reported comments
  const getComments = async () => {
    try {
      const response = await getReportByType('comment');
      if (response.success) {
        setComments(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  const handleDelete = async id => {
    const confirm = window.confirm(`Are you sure want to delete comment ${ id }`);
    if (confirm) {
      try {
        const response = await deleteCommentById(id);
        if (response.success) {
          const updatedComments = comments.filter(comment => comment.id !== id);
          setComments(updatedComments);
          showToast('Comment deleted successfully', 'success');
        } else {
          showToast(response.message, 'error');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleResolve = async id => {
    try {
      const response = await resolveCommentReport(id);
      if (response.success) {
        const updatedComments = comments.filter(comment => comment.id !== id);
        setComments(updatedComments);
        showToast('Comment resolved', 'success');
      } else {
        showToast(response.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="w-full grid place-items-center">
      <div className="my-8">
        <h1 className="text-center text-3xl font-black tracking-tighter">Reported Comments</h1>
      </div>
      <div className="w-full h-[70vh] overflow-auto shadow-md sm:rounded-lg">
        <table className="w-full text-md text-left text-cblack">
          <thead className="text-base text-cblack bg-cwhite">
            <tr>
              <th scope="col" className="px-6 py-3">
              Comment Id
              </th>
              <th scope="col" className="px-6 py-3">
              Description
              </th>
              <th scope="col" className="px-6 py-3">
              Reporter Id
              </th>
              <th scope="col" className="px-6 py-3">
              Created
              </th>
              <th scope="col" className="px-6 py-3">
              Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              // check if comments is not empty, if empty show no data found
              comments.length === 0 && (
                <tr className="bg-white border-b hover:bg-gray-100">
                  <td colSpan="5" className="px-6 py-4 text-center">
                    No data found
                  </td>
                </tr>
              )
            }
            {comments?.map(comment => (
              <tr key={comment.id} className="bg-white border-b hover:bg-cwhite">
                <td className="px-6 py-4">
                  {comment.comment_id}
                </td>
                <td className="px-6 py-4">
                  {comment.description}
                </td>
                <td className="px-6 py-4">
                  {comment.reporter_id}
                </td>
                <td className="px-6 py-4">
                  {dateConverter(comment.created_at)}
                </td>
                <td className="flex items-center px-6 py-4 space-x-3 text-base">
                  <div title='Resolve' onClick={() => {
                    handleResolve(comment.id);
                  }} className="font-medium text-success hover:cursor-pointer hover:bg-white p-3 rounded-sm">
                    <FaCheck />
                  </div>
                  <div title='Delete Comment' onClick={() => {
                    handleDelete(comment.id);
                  }} className="font-medium text-danger hover:cursor-pointer hover:bg-white p-3 rounded-sm">
                    <RiDeleteBin7Line />
                  </div>
                </td>
              </tr>
            ))
            }
        
            {/* More table rows */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommentTable;