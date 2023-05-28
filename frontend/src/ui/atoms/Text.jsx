const Text = ({ children, className }) => (
  <p className={`text-sm text-secondary ${ className }`}>
    { children }
  </p >
);

export default Text;