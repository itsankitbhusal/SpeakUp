import { useParams } from 'react-router-dom';

const Verify = () => {
  const { token } = useParams();
  return (
    <>
      <div>verify</div>
      {token}
    </>
  );
};

export default Verify;
