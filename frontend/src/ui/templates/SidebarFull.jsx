import { useContext } from 'react';
import { GrClose } from 'react-icons/gr';
import SidebarLinks from '../molecules/SidebarLinks';
import Button from '../atoms/Button';
import { NavbarContext } from '../../context/NavbarContext';

const SidebarFull = ({ className }) => {
  const { isSidebarOpen, handleSidebar } = useContext(NavbarContext);
  return (
    <div className={`w-full h-full rounded-sm  ${ className }`}>
      <div className='relative min-w-[20vw] flex justify-start items-center'>
        <div className="grid place-items-center my-16">
          <SidebarLinks />
          {isSidebarOpen && (
            <>
              <div className=" absolute right-0 top-4">
                <Button variant="icon" onClick={handleSidebar}>
                  <GrClose />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarFull;
