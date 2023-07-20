import Logo from '../atoms/Logo';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { GrClose } from 'react-icons/gr';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useContext, useEffect, useState } from 'react';
import { NavbarContext } from '../../context/NavbarContext';
import { searchConfessionByTitle } from '../../services/confessions';
import { ConfessionContext } from '../../context/ConfessionContext';
import { showToast } from '../../utils/toast';

const Header = () => {
  const [search, setSearch] = useState('');
  const [searchModal, setSearchModal] = useState(false);
  const [searchedConfession, setSearchedConfession] = useState([]);
  const { handleSidebar, isVerifiedUser } = useContext(NavbarContext);
  const { setConfessions } = useContext(ConfessionContext);

  const handleSearchChange = async e => {
    if (!isVerifiedUser) {
      showToast('Please verify account to search', 'error');
      return;
    }
    setSearch(e.target.value);
    // check if innerWidth is smaller than 1024px
    if (window.innerWidth > 1024) {
      return;
    }
    if (e.target.value.length > 3) {
      setSearchModal(true);
      await getSearchResults(e.target.value);
    }
  };

  const getSearchResults = async title => {
    const response = await searchConfessionByTitle(title, 10, 0);
    const { data } = await response;
    if (response.success) {
      if (data.confessions.length > 0) {
        setSearchedConfession(data.confessions);
      }
    }
  };

  // trim confession body to 300 chars
  const trimBody = body => {
    if (body.length > 200) {
      return `${ body.slice(0, 200) }...`;
    }
    return body;
  };

  // handle search button click
  const handleSearchClick = async () => {
    // code to search confession
    if (!isVerifiedUser) {
      showToast('Please verify account to search', 'error');
      return;
    }
    if (search.length < 3) {
      showToast('Please enter atleast 3 characters', 'error');
      return;
    }
    await getSearchResults(search);

  };

  // handle confession click
  const handleConfessionClick = async confession => {
    setSearchModal(false);
    setSearch('');

    // set confessions to searched confession
    setConfessions(prevConfessions => {
      const newConfessions = prevConfessions.filter(
        conf => conf.id !== confession.id
      );
      return [confession, ...newConfessions];
    });
  };

  useEffect(() => {
    if (search.length < 3) {
      setSearchModal(false);
    } else {
      setSearchModal(true);
    }
  }, [search]);

  return (
    <>
      <header className="grid place-items-center">
        <div className="flex w-[95vw] sm:w-[80vw] lg:w-[60vw] justify-between gap-0 md:gap-4 outline rounded-sm outline-primary outline-[1.5px] my-4">
          <div className="flex items-center ">
            <div className="max-w-[100px] sm:max-w-[150px] sm:max-h-[48px] ml-2 flex gap-2 justify-center items-center">
              <Logo />
            </div>
          </div>
          <Input
            value={search}
            onChange={handleSearchChange}
            placeholder="Search..."
            className={
              'bg-inherit outline-none border-none w-[28vw] sm:w-[32vw] '
            }
          />
          <Button
            onClick={handleSidebar}
            className="text-primary text-base sm:text-xl lg:hidden "
          >
            <GiHamburgerMenu />
          </Button>
          <div className="sm:min-w-0 xl:min-w-[150px] transition-all hidden lg:block">
            <Button onClick={handleSearchClick} className="w-full h-full flex rounded-l-none text-2xl">
              <RxMagnifyingGlass />
            </Button>
          </div>
        </div>
      </header>
      <div className=" grid place-items-center">
        {searchModal && (
          <div className="relative w-full sm:max-w-[80vw] h-screen bg-transparent bg-opacity-95 mx-4 lg:ml-24 grid place-items-center ">
            <div className="absolute top-0 right-8 sm:right-0 shadow-lg lg:mr-20 bg-white z-10">
              <span
                onClick={() => {
                  setSearchModal(false);
                  setSearch('');
                }}
                className=" hover:bg-primary hover:text-white text-primary rounded-sm outline outline-1 outline-primary hover:cursor-pointer h-8 w-8 grid place-items-center"
              >
                <GrClose />
              </span>
            </div>
            <div className="absolute w-full flex justify-end right-0 overflow-y-auto lg:mr-20 lg:w-[45vw] h-full rounded-sm shadow-md">
              <div className=" relative">
                <div className=" max-w-full">
                  {searchedConfession?.map(confession => (
                    <div
                      onClick={() => handleConfessionClick(confession)}
                      key={confession.id}
                      className="grid p-2 hover:bg-gray-200 hover:cursor-pointer"
                    >
                      <h3 className="text-md font-semibold">
                        {confession.title}
                      </h3>
                      <p className="text-sm">{trimBody(confession.body)}</p>
                    </div>
                  ))}
                  {searchedConfession.length === 0 && (
                    <div className="grid w-screen place-items-center h-full">
                      <h3 className="text-md font-semibold">
                        No results found
                      </h3>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
