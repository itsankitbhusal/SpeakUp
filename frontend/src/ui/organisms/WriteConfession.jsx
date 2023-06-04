import { useContext } from 'react';
import { ModalContext } from '../../context/ModalContext';
import CreateConfession from '../atoms/CreateConfession';
import CreateConfessionModal from './CreateConfessionModal';


const WriteConfession = () => {
  const { showModal, OpenModal } = useContext(ModalContext);
  
  const handleCreateConfessionClick = () => {
    OpenModal();
  };
  return (
    <>
      <div className='mt-32 mb-8 w-full ' onClick={handleCreateConfessionClick} >
        <CreateConfession />
      </div>
      {showModal && <CreateConfessionModal />}
    </>
  );
};

export default WriteConfession;