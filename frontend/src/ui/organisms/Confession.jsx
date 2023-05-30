import ConfessionPost from '../molecules/ConfessionPost';

const Confession = ({ handle, date, views, title, body }) => (
  <div>
    <ConfessionPost handle={handle} date={date} views={views} title={title} body={body} />
  </div>
);

export default Confession;