import { useState, useContext } from 'react';
import { NavbarContext } from '../../context/NavbarContext';
import { ModalContext } from '../../context/ModalContext';
import CreateConfession from '../atoms/CreateConfession';
import CreateConfessionModal from './CreateConfessionModal';
import { showToast } from '../../utils/toast';


const WriteConfession = () => {
  const { showModal, OpenModal } = useContext(ModalContext);
  const { isVerifiedUser } = useContext(NavbarContext);
  const [preserveData, setPreserveData] = useState({
    title: '',
    body: ''
  });
  
  const handleCreateConfessionClick = () => {
    if (!isVerifiedUser) {
      showToast('Please verify account to create confession', 'error');
      return;
    }
    OpenModal();
  };
  return (
    <>
      <div className='mt-32 mb-8 w-full' onClick={handleCreateConfessionClick} >
        <div title='Create Confession' className='w-[95vw] sm:w-[80vw] md:w-[60vw] lg:w-full mx-1'>
          <CreateConfession />
        </div>
      </div>
      {showModal && <CreateConfessionModal preserveData={preserveData} setPreserveData={setPreserveData} />}
    </>
  );
};

export default WriteConfession;