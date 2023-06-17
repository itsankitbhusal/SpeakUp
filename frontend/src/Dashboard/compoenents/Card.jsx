import Heading from '../../ui/atoms/Heading';

const Card = () => (
  <div className='rounded-sm py-8 px-16 outline outline-1 outline-cwhite hover:shadow-lg hover:cursor-pointer transition-all'>
    <Heading heading='h1'>User</Heading>
    <div>
      <div>245</div>
      <div>Posts</div>
    </div>
  </div>
);

export default Card;