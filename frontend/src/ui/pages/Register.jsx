import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterTemp from '../templates/RegisterTemp';

const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const refresh = localStorage.getItem('refresh');
    if (refresh) {
      navigate('/');
    }
  }, []);
  return (
    <>
      <RegisterTemp />
    </>
  );
};

export default Register;