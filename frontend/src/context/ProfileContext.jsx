import { useState, useEffect, createContext } from 'react';
import { getAllConfessionsByUser } from '../services/confessions';
import { getUserById } from '../services/auth';

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [confessions, setConfessions] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  // all data needed for the profile page
  const [user, setUser] = useState(null);
  const [profileAvatar, setProfileAvatar] = useState(null);

  const getUserData = async () => {
    const response = await getUserById();
    if (response.success) {
      const { data } = response;
      setProfileAvatar(`https://ui-avatars.com/api/?background=348371&name=${ data?.handle }&bold=true&color=fff&uppercase=false&length=1`);
      setUser(data);
    } else {
      throw new Error(response.message);
    }
  };


  const getConfession = async () => {
    if (!hasMore) {return;}
    setIsLoading(true);
    const response = await getAllConfessionsByUser(limit, page);
    if (response.success) {
      const { data } = response;
      if (data.confessions.length < limit) {
        setHasMore(false);
      }
      setConfessions(prevConfessions => [...prevConfessions, ...data.confessions]);
    } else {
      throw new Error(response.message);
    }
    setIsLoading(false);
  };
    // on change of page or limit, get the confessions
  useEffect(() => {
    getConfession();
  }
  , [page, limit]);
    
  return (
    <ProfileContext.Provider value={{ confessions, setPage, isLoading, hasMore, user, getUserData, profileAvatar }}>
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileContext, ProfileProvider };