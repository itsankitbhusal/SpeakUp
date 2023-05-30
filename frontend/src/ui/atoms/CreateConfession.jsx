const CreateConfession = ({ onClick }) => (
  <>
    <div onClick={onClick} className='bg-cwhite text-cblack outline-dashed rounded-sm px-16 py-4 outline-[1.5px] w-full hover:cursor-pointer my-4'>
      <p>
            What's your confession today?
      </p>
    </div>
  </>
);

export default CreateConfession;