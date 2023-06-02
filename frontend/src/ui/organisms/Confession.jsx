import Line from '../atoms/Line';
import ConfessionPost from '../molecules/ConfessionPost';
import WriteComment from '../molecules/WriteComment';

const Confession = ({ handle, date, views, title, body }) => (
  <div className=' my-8'>
    <ConfessionPost handle={handle} date={date} views={views} title={title} body={body} />
    <div className=' my-4'>
      <WriteComment />
    </div>
    <Line />
  </div>
);

export default Confession;