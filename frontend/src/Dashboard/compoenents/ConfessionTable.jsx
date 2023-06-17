import { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { RiDeleteBin7Line } from 'react-icons/ri';

import { getAllPendingConfessions, approveConfession, deleteConfession } from '../../services/confessions';
import { dateConverter } from '../../utils/dateConverter';
import ShowConfession from './ShowConfession';

import { showToast } from '../../utils/toast';

const ConfessionTable = () => {
  const [confessions, setConfessions] = useState([]);
  const [showConfessionModal, setShowConfessionModal] = useState(false);
  const [selectedConfessionId, setSelectedConfessionId] = useState({});
    
  useEffect(() => {
    const getConfessions = async () => {
      const response = await getAllPendingConfessions();
      if (response.success) {
        setConfessions(response.data.confessions);
      }
    };
    getConfessions();
  }, []);
  
  const handleDelete = async id => {
    const confirm = window.confirm(`Are you sure want to delete confession ${ id }`);
    if (confirm) {
      const response = await deleteConfession(id);
      if (response.success) {
        const updatedConfessions = confessions.filter(confession => confession.id !== id);
        setConfessions(updatedConfessions);
        showToast('Confession deleted successfully', 'success');
      } else {
        showToast(response.message, 'error');
      }
    }
  };
  const handleApprove = async id => {
    const response = await approveConfession(id);
    if (response.success) {
      const updatedConfessions = confessions.filter(confession => confession.id !== id);
      setConfessions(updatedConfessions);
      showToast('Confession approved successfully', 'success');
    } else {
      showToast(response.message, 'error');
    }

  };
  
  const handleShowConfession = async id => {
    setShowConfessionModal(true);
    setSelectedConfessionId(id);
  };

  return (
    <div className="w-full grid place-items-center">
      <div className="my-8">
        <h1 className="text-center text-3xl font-black tracking-tighter">UnApproved Confessions</h1>
      </div>
      <div className="w-full h-[70vh] overflow-auto shadow-md sm:rounded-lg">
        <table className="w-full text-md text-left text-cblack">
          <thead className="text-base text-cblack bg-cwhite">
            <tr>
              <th scope="col" className="px-6 py-3">
              Id
              </th>
              <th scope="col" className="px-6 py-3">
              Title
              </th>
              <th scope="col" className="px-6 py-3">
              Handle
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
              confessions.length === 0 && (
                <tr className="bg-white border-b hover:bg-cwhite">
                  <td className="px-6 py-4 text-center" colSpan={5}>
                    No Confessions
                  </td>
                </tr>
              )
            }
            {confessions?.map(confession => (
              <tr key={confession.id} className="bg-white border-b hover:bg-cwhite">
                <td className="px-6 py-4">
                  {confession.id}
                </td>
                <td onClick={() => {
                  handleShowConfession(confession.id);
                }} title='Click to view Confession' className="px-6 py-4 hover:cursor-pointer">
                  {confession.title}
                </td>
                <td className="px-6 py-4">
                  {confession.user.handle}
                </td>
                <td className="px-6 py-4">
                  {dateConverter(confession.created_at)}
                </td>
                <td className="flex items-center px-6 py-4 space-x-3 text-base">
                  <div title='Approve' onClick={() => {
                    handleApprove(confession.id);
                  }} className="font-medium text-success hover:cursor-pointer hover:bg-white p-3 rounded-sm">
                    <FaCheck />
                  </div>
                  <div title='Delete' onClick={() => {
                    handleDelete(confession.id);
                  }} className="font-medium text-danger hover:cursor-pointer hover:bg-white p-3 rounded-sm">
                    <RiDeleteBin7Line />
                  </div>
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
      {showConfessionModal && <ShowConfession id={selectedConfessionId} setShowConfessionModal={setShowConfessionModal} />}
    </div>
  );
};

export default ConfessionTable;