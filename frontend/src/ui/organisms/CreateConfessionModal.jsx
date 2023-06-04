import Input from '../atoms/Input';
import TextArea from '../atoms/TextArea';
import Modal from '../molecules/Modal';
import Text from '../atoms/Text';

const CreateConfessionModal = () => (
  <Modal title="Create Confession" showSaveButton showCancelButton >
    <div className=" p-4 flex flex-col gap-2 ">
      <Text className=" font-semibold text-[.8rem]">Confession Title</Text>
      <Input placeholder="Enter Confession Title" className="w-full" />
      <Text className=" font-semibold text-[.8rem]">Confession Body</Text>
      <TextArea placeholder="Enter Confession" />
    </div>
  </Modal>
);

export default CreateConfessionModal;
