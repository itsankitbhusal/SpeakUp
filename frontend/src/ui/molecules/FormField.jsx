import Label from '../atoms/Label';
import Input from '../atoms/Input';
import FormError from '../atoms/FormError';
import TextArea from '../atoms/TextArea';

const FormField = ({ id, type, placeholder, value, onChange, className, label, onBlur, error, name, textArea }) => (
  <>
    <div className={`grid place-items-start w-full relative ${ className }`}>
      <Label htmlFor={id} className>{label}</Label>
      {textArea ?
        <TextArea placeholder={placeholder} value={value} onChange={onChange} name={name} />
        :
        (
          <Input
            className="w-full"
            name={name}
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
          />
        )
      }
      <FormError className="-bottom-4" error={error} />
    </div>
  </>
);

export default FormField;
