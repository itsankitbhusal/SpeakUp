const Input = ({ type, placeholder, value, onChange, id, className, name }) => 
  // code
  (
    <input
      name={name}
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border py-2 px-5 bg-transparent rounded-sm ${ className }`}
    />
  )
;

export default Input;