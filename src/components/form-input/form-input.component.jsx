import { FormInputLabel, Group, Input } from './form-input.styles';

// const FormInput = ({ label, onChange, value }) => {
//   return (
//     <div>
//       {' '}
//       <label>{label}</label>
//       <input type='text' required onChange={changeHandler} name='displayName' value={value} />
//     </div>
//   );
// };

//because we use the same names on properties and values we can spread

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && <FormInputLabel shrink={otherProps.value.length}>{label}</FormInputLabel>}
    </Group>
  );
};
//note && -- if label exists (short circuit in JS)
//note that label className is say that is the user start typing the label will shrink

export default FormInput;
