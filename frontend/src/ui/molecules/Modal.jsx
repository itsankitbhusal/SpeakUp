import { useRef, useEffect, useContext } from 'react';
import { ModalContext } from '../../context/ModalContext';

import Dialog from '../atoms/Dialog';
import Button from '../atoms/Button';
import Heading from '../atoms/Heading';
import { IoMdClose } from 'react-icons/io';

const Modal = ({ children, title, showSaveButton, showCancelButton }) => {
  const modalRef = useRef();

  const { showModal, CloseModal } = useContext(ModalContext);

  useEffect(() => {
    let initialRender = true;
    function handleClickOutside(event) {
      if (initialRender) {
        initialRender = false;
        return;
      }
      if (!showModal) {
        return;
      }
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        CloseModal();
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showModal]);

  return (
    <div>
      {showModal && (
        <Dialog className={'rounded-sm'}>
          <div ref={modalRef} className="modal rounded-sm w-[40vw] p-4">
            <div className="flex justify-between items-center p-2 rounded-sm">
              <Heading heading="h4" className="text-lg">
                {title}
              </Heading>
              <IoMdClose
                onClick={CloseModal}
                className=" font-bold text-primary text-xl hover:cursor-pointer"
              />
            </div>
            <div className="p-2">{children}</div>
            <div className="flex gap-2 justify-end p-2">
              {showCancelButton && (
                <Button onClick={CloseModal} variant="ghost">
                  Cancel
                </Button>
              )}
              {showSaveButton && (
                <Button type="submit" variant="primary">
                  Save
                </Button>
              )}
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default Modal;
