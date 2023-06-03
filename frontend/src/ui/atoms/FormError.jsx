const FormError = ({ error, className }) => (
  <div className={` absolute  text-danger text-sm italic w-full flex justify-end items-center ${ className }`}>
    {error}
  </div>
);
    
export default FormError;
