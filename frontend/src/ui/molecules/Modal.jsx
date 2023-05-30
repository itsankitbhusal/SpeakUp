import Dialog from '../atoms/Dialog';
import Button from '../atoms/Button';
import Heading from '../atoms/Heading';
import { IoMdClose } from 'react-icons/io';
import { useState, useEffect } from 'react';

const Modal = ({ children, title, showSaveButton, showCancelButton, onClose, onCancel, className }) => {
  const [isOpen, setIsOpen] = useState(true);
    
  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };
  const cancelModal = () => {
    setIsOpen(false);
    onCancel();
  };
  const handelOutsideClick = e => {
    if (e.target.closest('.modal') === null) {
      closeModal();
    }
  };
  useEffect(() => {
    document.addEventListener('click', handelOutsideClick);
  },[]);
  return (
    <div >{
      isOpen && (
        <Dialog className={className} >
          <div className='flex justify-between items-center p-2 rounded-sm'>
            <Heading heading="h4" className="text-lg">{title}</Heading>
            <IoMdClose onClick={closeModal} className=' font-bold text-primary text-xl hover:cursor-pointer' />
          </div>
          <div className='p-2'>
            {children}
          </div>
          <div className='flex gap-2 justify-end p-2'>
            {
              showCancelButton && (
                <Button onClick={cancelModal} variant='ghost'>Cancel</Button>
              )
            }
            {showSaveButton && (
              <Button variant="primary">Save</Button>
            )}
          </div>
        </Dialog>
      )
    }
    </div>
  );
};

export default Modal;