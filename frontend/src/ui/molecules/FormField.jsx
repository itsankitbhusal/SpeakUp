import Label from '../atoms/Label';
import Input from '../atoms/Input';
const FormField = ({ id, type, placeholder, value, onChange, className, label }) => (
  <>
    <div className={`grid place-items-start w-full ${ className }`}>
      <Label htmlFor={id} className >{label}</Label>
      <Input className="w-full" id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  </>
);

export default FormField;