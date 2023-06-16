import { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { RiDeleteBin7Line } from 'react-icons/ri';

import { getAllPendingConfessions } from '../../services/confessions';
import { dateConverter } from '../../utils/dateConverter';

const ConfessionTable = () => {
  const [confessions, setConfessions] = useState([]);
    
  useEffect(() => {
    // code)
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
    console.log('confirm', id);
    if (confirm) {
      // code
    }
  };
  const handleApprove = async id => {
    console.log('Approve confession', id);
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
              confessions.map(confession => (
                <tr key={confession.id} className="bg-white border-b hover:bg-cwhite">
                  <td className="px-6 py-4">
                    {confession.id}
                  </td>
                  <td className="px-6 py-4">
                    {confession.title}
                  </td>
                  <td className="px-6 py-4">
                    {confession.user.handle}
                  </td>
                  <td className="px-6 py-4">
                    {dateConverter(confession.created_at)}
                  </td>
                  <td className="flex items-center px-6 py-4 space-x-3 text-base">
                    <div onClick={() => {
                      handleApprove(confession.id);
                    }} className="font-medium text-success hover:cursor-pointer hover:bg-white p-3 rounded-sm">
                      <FaCheck />
                    </div>
                    <div onClick={() => {
                      handleDelete(confession.id);
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

export default ConfessionTable;