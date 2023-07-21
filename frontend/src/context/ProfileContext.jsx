import { useState, useEffect, createContext } from 'react';
import { getAllConfessionsByHandle } from '../services/confessions';
import { getUserByHandle } from '../services/auth';

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [userDataLoading, setUserDataLoading] = useState(false);
  const [confessions, setConfessions] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  // all data needed for the profile page
  const [user, setUser] = useState(null);
  const [profileAvatar, setProfileAvatar] = useState(null);

  const [profileHandle, setProfileHandle] = useState(null);

  const getUserData = async handle => {
    setUserDataLoading(true);
    try {
      const response = await getUserByHandle(handle);
      if (response.success) {
        const { data } = response;
        setProfileAvatar(`https://ui-avatars.com/api/?background=348371&name=${ data?.handle }&bold=true&color=fff&uppercase=false&length=1`);
        setUser(data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUserDataLoading(false);
    }
  };


  const getConfession = async () => {
    if (!hasMore) {return;}
    setIsLoading(true);
    try {
      const response = await  getAllConfessionsByHandle(limit, page, profileHandle);
      if (response.success) {
        const { data } = response;
        if (data.confessions.length < limit) {
          setHasMore(false);
        }
        setConfessions(prevConfessions => [...prevConfessions, ...data.confessions]);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
    // on change of page or limit, get the confessions
  useEffect(() => {
    getConfession();
  }
  , [page, limit, profileHandle]);
  
  // for user data
  useEffect(() => {
    getUserData(profileHandle);
  },[profileHandle]);
    
  return (
    <ProfileContext.Provider value={{ confessions, setPage, isLoading, userDataLoading, hasMore, user, getUserData, profileAvatar, profileHandle, setProfileHandle }}>
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileContext, ProfileProvider };