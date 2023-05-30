const Heading = ({ children, className, heading }) => {
  const HeadingTag = heading || 'h1';
  return (
    <HeadingTag className={`text-2xl text-cblack font-bold ${ className }`}>
      {children}
    </HeadingTag>
  );
};

export default Heading;