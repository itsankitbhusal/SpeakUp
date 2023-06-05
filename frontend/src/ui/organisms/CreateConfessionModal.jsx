import { useContext } from 'react';
import { ModalContext } from '../../context/ModalContext';
import Input from '../atoms/Input';
import TextArea from '../atoms/TextArea';
import Modal from '../molecules/Modal';
import Text from '../atoms/Text';
import { createConfession } from '../../services/confessions';

const CreateConfessionModal = () => {
  const { handleInputConfession, confession } = useContext(ModalContext);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('confession data: ', confession);
    const response = await createConfession(confession);
    console.log(response);

  };
  return (
    <form onSubmit={handleSubmit}>
      <Modal title="Create Confession" showSaveButton showCancelButton >
        <div className=" p-4 flex flex-col gap-2 ">
          <Text className=" font-semibold text-[.8rem]">Confession Title</Text>
          <Input placeholder="Enter Confession Title" name="title" onChange={handleInputConfession} className="w-full" />
          <Text className=" font-semibold text-[.8rem]">Confession Body</Text>
          <TextArea placeholder="Enter Confession" name="body" onChange={handleInputConfession} />
        </div>
      </Modal>
    </form>
  );
};

export default CreateConfessionModal;
