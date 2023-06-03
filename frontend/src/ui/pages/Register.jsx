import RegisterTemp from '../templates/RegisterTemp';
import { useState, useEffect } from 'react';

import { register } from '../../services/auth';
import { UserContext } from '../../context/UserContext';

const Register = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (userData) {
          const user = await register();
          setUserData(user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
  
  return(
    <UserContext.Provider value={{ userData, setUserData }}  >
      <RegisterTemp />
    </UserContext.Provider>
  );
};

export default Register;