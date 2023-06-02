import Input from '../atoms/Input';
import Label from '../atoms/Label';

const Checkbox = () => (
  <div className=' flex gap-2 justify-center items-center'>
    <Input type="checkbox" id="checkbox" className="form-checkbox w-4 h-4 transition duration-150 ease-in-out" />
    <Label htmlFor="checkbox">Please confirm that you agree to our <span>terms & condition</span></Label>
  </div>
);

export default Checkbox;