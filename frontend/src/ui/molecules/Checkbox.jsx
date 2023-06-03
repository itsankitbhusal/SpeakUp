import FormError from '../atoms/FormError';
import Input from '../atoms/Input';
import Label from '../atoms/Label';

const Checkbox = ({ className, onChange, error, name }) => (
  <div className={`flex gap-2 justify-center items-center relative ${ className }`}>
    <Input name={name} type="checkbox" id="checkbox" onChange={onChange} className="form-checkbox w-4 h-4 transition duration-150 ease-in-out" />
    <Label htmlFor="checkbox">Please confirm that you agree to our <span>terms & condition</span></Label>
    <FormError className=" top-6" error={error} />
  </div>
);

export default Checkbox;