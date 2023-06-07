const Text = ({ children, className }) => (
  <p className={`text-base text-secondary ${ className }`}>
    { children }
  </p >
);

export default Text;