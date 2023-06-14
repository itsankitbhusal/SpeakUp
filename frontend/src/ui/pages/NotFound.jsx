import Button from '../atoms/Button';
import Text from '../atoms/Text';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <>
    <div className=' grid place-items-center min-h-screen'>
      <div className='grid place-items-center gap-2 p-8 rounded-sm'>
        <Text className=" text-404 text-bold text-dangerLight -mb-12 ">404</Text>
        <Text className=" text-base">Ooops! Page Not Found</Text>
        <div className=' grid place-items-center'>
          <Text className="text-md">This page doesn't exist or was removed!</Text>
          <Text className="text-md">We suggest you back to home</Text>
        </div>
        <Link to="/">
          <Button className="mt-4" variant="outline-primary" >Back to home</Button>
        </Link>
      </div>
    </div>
  </>
);

export default NotFound;