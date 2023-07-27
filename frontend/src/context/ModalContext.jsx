import { createContext, useState } from 'react';

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  const OpenModal = () => {
    setShowModal(true);
    // stop scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };
  const CloseModal = () => {
    setShowModal(false);
    // allow scrolling when modal is closed
    document.body.style.overflow = 'unset';
  };

  return (
    <ModalContext.Provider value={{ showModal, OpenModal, CloseModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
