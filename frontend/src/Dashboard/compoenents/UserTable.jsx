import React, { useEffect } from 'react';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { deleteUser, getAllUsers } from '../../services/auth';
import { dateConverter } from '../../utils/dateConverter';
import { showToast } from '../../utils/toast';

const UserTable = () => {
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    const getUser = async() => {
      const response = await getAllUsers();
      if (response.success) {
        setUsers(response.data);
      }
    };
    getUser();
  }, []);

  const handleDelete = async (handle, id) => {
    const confirm = window.confirm(`Are you sure want to delete user ${ handle }`);
    if (confirm) {
      const deleted = await deleteUser(id);
      if (deleted.success) {
        showToast('User deleted successfully', 'success');
        setUsers(
          users.filter(user => user.id !== id)
        );
      } else {
        showToast('Something went wrong', 'error');
      }
    }
  };

  return(
    <div className="w-full grid place-items-center">
      <div className="my-8">
        <h1 className="text-center text-3xl font-black tracking-tighter">User Details</h1>
      </div>
      <div className="w-full h-[70vh] overflow-auto shadow-md sm:rounded-lg">
        <table className="w-full text-md text-left text-cblack">
          <thead className="text-base text-cblack bg-cwhite">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Handle
              </th>
              <th scope="col" className="px-6 py-3">
                Verified
              </th>
              <th scope="col" className="px-6 py-3">
                Joined
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(user => (
                <tr key={user.id} className="bg-white border-b hover:bg-cwhite">
                  <td className="px-6 py-4">
                    {user.id}
                  </td>
                  <td className="px-6 py-4">
                    {user.handle}
                  </td>
                  <td className="px-6 py-4">
                    {user.is_verified ? '✅' : '❌'}
                  </td>
                  <td className="px-6 py-4">
                    {dateConverter(user.created_at)}
                  </td>
                  <td className="flex items-center px-6 py-4 space-x-3 text-base text-center">
                    <div onClick={() => {
                      handleDelete(user.handle, user.id);
                    }} className="font-medium text-danger hover:cursor-pointer hover:bg-white p-3 rounded-sm"><RiDeleteBin7Line /></div>
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

export default UserTable;
