const Text = ({ children, className, div }) => {
  const Tag = div ? 'div' : 'p';
  return (
    <Tag className={`text-base text-secondary ${ className }`}>
      {children}
    </Tag >
  );
};

export default Text;