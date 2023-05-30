const Label = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="text-[.9rem] text-secondaryLight">
    {children}
  </label>
);

export default Label;