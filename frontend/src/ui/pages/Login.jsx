import { useNavigate } from 'react-router-dom';
import LoginTemp from '../templates/LoginTemp';
import { useEffect } from 'react';
const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const refresh = localStorage.getItem('refresh');
    if (refresh) {
      navigate('/');
    }
  }, []);

  return (
    <div className=' '>
      <LoginTemp />
    </div>
  );
};

export default Login;