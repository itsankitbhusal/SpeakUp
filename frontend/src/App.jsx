import Header from './ui/molecules/Header';
import CreateConfession from './ui/atoms/CreateConfession';
import Line from './ui/atoms/Line';
import Confession from './ui/organisms/Confession';
import WriteComment from './ui/molecules/WriteComment';
import Comments from './ui/organisms/Comments';
import CreateConfessionModal from './ui/organisms/CreateConfessionModal';

const App = () => {
  let title = 'What Is a Smart Home? Overview and Sustainability, A smart home includes high-tech heating and lighting systems and appliances that can be controlled remotely with a phone or a computer';
  title = `${ title.slice(0, 150)  }...`;
  let body = 'A smart home includes high-tech heating and lighting systems and appliances that can be controlled remotely with a phone or a computer. The term "smart home" only recently entered the lexicon of folks both tech-savvy and eco-conscious. Smart home technologies may include Google\'s Nest, Amazon\'s Echo, Apple\'s HomeKit, Ring, and the Ecobee SmartThermostat, among others. Smart home automation (SHA) is ripe with benefits: Apart from convenience, it can improve energy efficiency, maximize home security, and grant access to remote monitoring. It has also been criticized, mostly because the technology itself must be powered around the clock. Discover more examples of smart home devices—their benefits, drawbacks, and sustainability—and how to make your smart home even more environmentally friendly.Examples of Smart Home Systems. Someday, there might be an all-encompassing SHA kit for purchase. For now, smart homes typically comprise a range of devices, gadgets, and systems that each have their own functions but can connect with other platforms for optimal functionality. Here are some common examples.';
  body = `${ body.slice(0, 1000)  }...`;
  return (

    <div className=' grid place-items-center my-8'>
      <Header />
      <br />
      <br />
      <div className=' w-[40vw]'>
        <CreateConfession />
        <br />
        <Line />
        <Confession handle="itsankitbhusal" date="21 May 2023" views="2.1k" title={title} body={body} />
        <Comments handle="itsankitbhusal" date="21 May 2023" view="2.1k" comment="well done" />
        <Comments handle="itsankitbhusal" date="21 May 2023" view="2.1k" comment={title} />
      </div>
      <CreateConfessionModal />
    </div>
  );
};

export default App;