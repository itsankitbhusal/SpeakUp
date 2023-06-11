import { useState, useContext } from 'react';
import { ModalContext } from '../../context/ModalContext';
import CreateConfession from '../atoms/CreateConfession';
import CreateConfessionModal from './CreateConfessionModal';


const WriteConfession = () => {
  const { showModal, OpenModal } = useContext(ModalContext);
  const [preserveData, setPreserveData] = useState({
    title: '',
    body: ''
  });
  
  const handleCreateConfessionClick = () => {
    OpenModal();
  };
  return (
    <>
      <div className='mt-32 mb-8 w-full' onClick={handleCreateConfessionClick} >
        <div title='Create Confession'>
          <CreateConfession />
        </div>
      </div>
      {showModal && <CreateConfessionModal preserveData={preserveData} setPreserveData={setPreserveData} />}
    </>
  );
};

export default WriteConfession;