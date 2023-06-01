const Button = ({ children, onClick, className, variant }) => {
  const buttonType = variant || 'primary';
  let buttonClassName = 'px-5 py-2 rounded-sm font-bold transition-all duration-150 ease-in-out flex justify-center items-center gap-2 ';
  
  switch (buttonType) {
  case 'primary':
    buttonClassName += ` bg-primary text-white hover:bg-primaryDark ${ className }`;
    break;
  case 'secondary':
    buttonClassName += ` bg-secondary text-white hover:bg-secondaryDark ${ className }`;
    break;
  case 'ghost':
    buttonClassName += ` bg-gray-200 text-black hover:bg-gray-300 ${ className }`;
    break;
  case 'danger':
    buttonClassName += ` bg-danger text-white  hover:bg-dangerDark ${ className }`;
    break;
  case 'warning':
    buttonClassName += ` bg-warning text-white  hover:bg-warningDark ${ className }`;
    break;
  case 'success':
    buttonClassName += ` bg-success text-white  hover:bg-successDark ${ className }`;
    break;
  case 'info':
    buttonClassName += ` bg-info text-white  hover:bg-infoDark ${ className }`;
    break;
  case 'user':
    buttonClassName += ` bg-user text-primary outline outline-1 px-8 rounded-3xl font-semibold hover:bg-cwhite ${ className }`;
    break;
  case 'outline-primary':
    buttonClassName += ` bg-transparent text-primary border border-primary  hover:bg-primaryLight hover:text-white hover:border-primaryLight ${ className }`;
    break;
  case 'outline-secondary':
    buttonClassName += ` bg-transparent text-secondary border border-secondary  hover:bg-secondaryLight hover:text-white hover:border-secondaryLight ${ className }`;
    break;
  default:
    buttonClassName += `${ className }`;
    break;
  }
  
  return (
    <button className={` ${ buttonClassName }  ${ className }`} onClick={onClick}>
      {children}
    </button>
  );
};


export default Button;