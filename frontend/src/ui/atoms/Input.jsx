const Input = ({ type, placeholder, value, onChange, id, className }) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`border py-2 px-5 rounded-sm ${ className }`}
  />
);

export default Input;