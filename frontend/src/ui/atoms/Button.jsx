const Button = ({ children, onClick, className }) => (
  <button onClick={onClick} className={`bg-primary hover:bg-primaryDark text-white font-bold py-2 px-4 rounded-sm ${ className }`}>
    {children}
  </button>
);


export default Button;