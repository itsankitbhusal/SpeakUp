const TextArea = ({ placeholder, value, onChange, name, className }) => (
  <textarea
    className={`w-full h-40 p-2 border-2 border-gray-300 rounded-sm focus:outline-none focus:border-cblack max-h-[50vh] ${ className }`}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    name={name}
  />
);

export default TextArea;
