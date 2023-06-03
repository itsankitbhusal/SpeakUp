import Label from '../atoms/Label';
import Input from '../atoms/Input';
import FormError from '../atoms/FormError';

const FormField = ({ id, type, placeholder, value, onChange, className, label, onBlur, error }) => (
  <>
    <div className={`grid place-items-start w-full relative ${ className }`}>
      <Label htmlFor={id} className>{label}</Label>
      <Input
        className="w-full"
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
      />
      <FormError className="top-16" error={error} />
    </div>
  </>
);

export default FormField;
