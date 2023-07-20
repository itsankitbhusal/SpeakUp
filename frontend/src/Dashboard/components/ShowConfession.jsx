import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { AiOutlineClose } from 'react-icons/ai';
import { getConfessionById } from '../../services/confessions';

const ShowConfession = ({ id, setShowConfessionModal }) => {
  const [confession, setConfession] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // get single confession by id
  const getConfession = async () => {
    setLoading(true);
    try {
      const response = await getConfessionById(id);
      if (response.success) {
        setConfession(response.data);
        setLoading(false);
      }
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConfession();
  }, [id]);

  const handleCloseClick = () => {
    setShowConfessionModal(false);
  };

  const handleOutsideClick = e => {
    if (e.target.classList.contains('fixed')) {
      setShowConfessionModal(false);
    }
  };
    
  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return(
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Something went wrong</div>}
      <div className="fixed z-10 inset-0 overflow-y-auto " aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-cblack bg-opacity-75 transition-opacity" aria-hidden="true"></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div className="inline-block align-center mt-32 bg-white rounded-sm text-left overflow-hidden shadow-xl transform transition-all w-8/12">
            <div className=' flex justify-between items-center px-2 py-1 bg-gray-100'>
              <div className=' font-bold'>View Confession</div>
              <div onClick={handleCloseClick} className=' text-lg p-2 rounded-sm hover:cursor-pointer hover:bg-cwhite transition-all'>
                <AiOutlineClose />
              </div>
            </div>
            <div className="py-4 px-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-semibold text-cblack" id="modal-title">
                    {confession.title}
                  </h3>
                  <hr />
                  <div className="mt-2 mb-4">
                    <p className="text-base text-cblack">
                      {confession.body}
                    </p>
                    <hr className=' my-8' />
                    <h3 className=' font-black text-xl'>Confession body preview</h3>
                    <p>
                      <ReactMarkdown>
                        {confession.body}
                      </ReactMarkdown>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowConfession;