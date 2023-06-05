import { createContext, useState } from 'react';

const ModalContext = createContext();


const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [inputConfession, setInputConfession] = useState({
    title: '',
    body: ''
  });

  const OpenModal = () => {
    setShowModal(true);
  };
  const CloseModal = () => {
    setShowModal(false);
  };
  const handleInputConfession = e => {
    setInputConfession({
      ...inputConfession,
      [e.target.name]: e.target.value
    });
  };

  const confession = {
    title: inputConfession.title,
    body: inputConfession.body
  };
  
  return (
    <ModalContext.Provider value={{ showModal, OpenModal, CloseModal, handleInputConfession, confession }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };