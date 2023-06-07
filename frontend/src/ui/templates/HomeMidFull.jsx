import { useContext } from 'react';
import { ModalProvider } from '../../context/ModalContext';
import { ConfessionContext } from '../../context/ConfessionContext';
import Confession from '../organisms/Confession';
import WriteConfession from '../organisms/WriteConfession';
import { dateConverter } from '../../utils/dateConverter';

const HomeMidFull = ({ className }) => {
  const { confessions, handleLimitChange, handlePageChange } =
    useContext(ConfessionContext);
  return (
    <div className={`grid place-items-center max-w-[40vw] ${ className }`}>
      <ModalProvider>
        <WriteConfession />
      </ModalProvider>
      <div>
        {confessions?.map(confession => (
          <Confession
            key={confession.id}
            handle={confession.user.handle}
            date={dateConverter(confession.created_at)}
            views={confession.views_count}
            title={confession.title}
            body={confession.body}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeMidFull;
