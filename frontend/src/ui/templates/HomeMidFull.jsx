import Confession from '../organisms/Confession';
import Navbar from '../organisms/Navbar';
import WriteConfession from '../organisms/WriteConfession';
const body = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe, fuga culpa numquam nam dolorum deserunt minima repudiandae ad quos! Sint pariatur voluptatem laborum quo omnis, enim quia molestiae iure! Ipsam! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe, fuga culpa numquam nam dolorum deserunt minima repudiandae ad quos! Sint pariatur voluptatem laborum quo omnis, enim quia molestiae iure! Ipsam!Lorem ipsum, dolor sit amet consectetur adipisicing elit.  Ipsam!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe, fuga culpa numquam nam dolorum deserunt minima repudiandae ad quos! Sint pariatur voluptatem laborum quo omnis, enim quia molestiae iure! Ipsam!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe, fuga culpa numquam nam dolorum deserunt minima repudiandae ad quos! Sint pariatur voluptatem laborum quo omnis, enim quia molestiae iure! Ipsam!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe, fuga culpa numquam nam dolorum deserunt minima repudiandae ad quos! Sint pariatur voluptatem laborum quo omnis, enim quia molestiae iure! Ipsam!';

const HomeMidFull = ({ className }) => (
  <div className={`grid place-items-center max-w-[40vw] ${ className }`} >
    <WriteConfession />
    <div >
      <Confession handle={'itsankitbhusal'} date={'21 May 2023'} views={'589'} title={'Title'} body={body} />
      <Confession handle={'itsankitbhusal'} date={'21 May 2023'} views={'589'} title={'Title'} body={body} />
      <Confession handle={'itsankitbhusal'} date={'21 May 2023'} views={'589'} title={'Title'} body={body} />
      <Confession handle={'itsankitbhusal'} date={'21 May 2023'} views={'589'} title={'Title'} body={body} />
      <Confession handle={'itsankitbhusal'} date={'21 May 2023'} views={'589'} title={'Title'} body={body} />
      <Confession handle={'itsankitbhusal'} date={'21 May 2023'} views={'589'} title={'Title'} body={'this is the short body'} />
    </div>
  </div>
);

export default HomeMidFull;