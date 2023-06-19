import { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { RiDeleteBin7Line } from 'react-icons/ri';

import { getReportByType, resolveConfessionReport } from '../../services/report';
import { dateConverter } from '../../utils/dateConverter';
import { showToast } from '../../utils/toast';
import { deleteConfession } from '../../services/confessions';

const ReportingTable = () => {
  const [confessions, setConfessions] = useState([]);
    
  useEffect(() => {
    const getComments = async () => {
      const response = await getReportByType('confession');
      if (response.success) {
        setConfessions(response.data);
      }
    };
    getComments();
  }, []);
  
  const handleDelete = async (id, confessionId) => {
    const confirm = window.confirm(`Are you sure want to delete confession ${ confessionId }`);
    if (confirm) {
      const response = await deleteConfession(confessionId);
      if (response.success) {
        if (response.data === 0) {
          showToast('Some error occured', 'error');
          return;
        }
        const updatedComments = confessions.filter(confession => confession.id !== id);
        setConfessions(updatedComments);
        showToast('Confession deleted successfully', 'success');
      } else {
        showToast(response.message, 'error');
      }
    }
  };
  const handleResolve = async id => {
    const response = await resolveConfessionReport(id);
    if (response.success) {
      const updatedConfessions = confessions.filter(confession => confession.id !== id);
      setConfessions(updatedConfessions);
      showToast('Confession resolved', 'success');
    } else {
      showToast(response.message, 'error');
    }
  };
  

  return (
    <div className="w-full grid place-items-center">
      <div className="my-8">
        <h1 className="text-center text-3xl font-black tracking-tighter">Reported confession</h1>
      </div>
      <div className="w-full h-[70vh] overflow-auto shadow-md sm:rounded-lg">
        <table className="w-full text-md text-left text-cblack">
          <thead className="text-base text-cblack bg-cwhite">
            <tr>
              <th scope="col" className="px-6 py-3">
              Confession Id
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
              confessions.map(confession => (
                <tr key={confession.id} className="bg-white border-b hover:bg-cwhite">
                  <td className="px-6 py-4">
                    {confession.confession_id}
                  </td>
                  <td className="px-6 py-4">
                    {confession.description}
                  </td>
                  <td className="px-6 py-4">
                    {confession.reporter_id}
                  </td>
                  <td className="px-6 py-4">
                    {dateConverter(confession.created_at)}
                  </td>
                  <td className="flex items-center px-6 py-4 space-x-3 text-base">
                    <div title='Resolve' onClick={() => {
                      handleResolve(confession.id);
                    }} className="font-medium text-success hover:cursor-pointer hover:bg-white p-3 rounded-sm">
                      <FaCheck />
                    </div>
                    <div title='Delete confession' onClick={() => {
                      handleDelete(confession.id, confession.confession_id);
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

export default ReportingTable;