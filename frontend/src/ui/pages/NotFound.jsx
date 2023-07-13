import Button from '../atoms/Button';
import Heading from '../atoms/Heading';
import Text from '../atoms/Text';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <>
    <div className=' grid place-items-center min-h-screen'>
      <div className='grid place-items-center gap-2 p-8 rounded-sm'>
        <Heading heading="h1" className="text-3xl -mb-4 sm:text-6xl sm:-mb-8 md:text-7xl font-normal md:-mb-16">404</Heading>
        <Text className=" text-sm sm:text-base">Ooops! Page Not Found</Text>
        <div className=' grid place-items-center'>
          <Text className="text-sm sm:text-base">This page doesn't exist or was removed!</Text>
          <Text className="text-sm sm:text-base">We suggest you back to home</Text>
        </div>
        <Link to="/">
          <Button className="mt-0 text-sm sm:text-base sm:mt-2 md:mt-4 font-normal" variant="outline-primary" >Back to home</Button>
        </Link>
      </div>
    </div>
  </>
);

export default NotFound;