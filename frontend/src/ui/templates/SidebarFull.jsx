import SidebarLinks from '../molecules/SidebarLinks';

const SidebarFull = ({ className }) => (
  <div className={`w-[20vw] rounded-sm ${ className }`}>
    <div className='flex justify-center items-center'>
      <div className='grid place-items-center my-16'>
        <SidebarLinks />
      </div>
    </div>
  </div>
);

export default SidebarFull;