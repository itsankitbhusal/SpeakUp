const Label = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="text-sm text-secondaryLight">
    {children}
  </label>
);

export default Label;