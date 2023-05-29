const Button = ({ children, onClick, className }) => (
  <button onClick={onClick} className={`bg-primary hover:bg-primaryDark transition-all text-white font-bold py-2 px-5 rounded-sm ${ className }`}>
    {children}
  </button>
);


export default Button;