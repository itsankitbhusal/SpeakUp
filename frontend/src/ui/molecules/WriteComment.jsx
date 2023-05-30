import Input from '../atoms/Input';

const WriteComment = () => (
  <>
    <div className="flex justify-end ml-2">
      <Input placeholder="Write a comment" className="w-11/12 outline outline-1 outline-primary" />
    </div>
  </> 
);

export default WriteComment;