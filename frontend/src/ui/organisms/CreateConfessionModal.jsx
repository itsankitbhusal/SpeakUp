import { useContext } from 'react';
import { ModalContext } from '../../context/ModalContext';
import Input from '../atoms/Input';
import TextArea from '../atoms/TextArea';
import Modal from '../molecules/Modal';
import Text from '../atoms/Text';
import { createConfession } from '../../services/confessions';
import { showToast } from '../../utils/toast';

const CreateConfessionModal = () => {
  const { handleInputConfession, confession, CloseModal } = useContext(ModalContext);

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await createConfession(confession);
    console.log(response);
    if (response.success) {
      // reset confession state
      handleInputConfession({ target: { name: 'title', value: '' } });
      showToast('Confession created successfully', 'success');

      // close modal as the confession is created
      CloseModal();
    }

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
