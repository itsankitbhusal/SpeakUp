import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { verifyUser } from '../../services/emails';
import { showToast } from '../../utils/toast';

const Verify = () => {
  const { token } = useParams();
  const [tokenValue, setTokenValue] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (token === undefined || token === null || token === '') {
      setTokenValue('');
    } else {
      setTokenValue(token);
    }
  }, [token]);

  useEffect(() => {
    const verifyUserWithAccount = async () => {
      try {
        const response = await verifyUser(tokenValue);
        if (response.success) {
          showToast('User verification success', 'success');
          navigate('/login');
        } else {
          showToast('User verification failed', 'error');
          navigate('/login');
        }
        
      } catch (error) {
        console.error(error);
      }
    };
    if (tokenValue !== '') {
      verifyUserWithAccount();
    }
  }, [tokenValue]);

  return null;
};

export default Verify;