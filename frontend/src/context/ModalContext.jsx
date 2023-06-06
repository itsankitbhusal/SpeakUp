import { createContext, useState } from 'react';

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  const OpenModal = () => {
    setShowModal(true);
  };
  const CloseModal = () => {
    setShowModal(false);
  };

  return (
    <ModalContext.Provider value={{ showModal, OpenModal, CloseModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
