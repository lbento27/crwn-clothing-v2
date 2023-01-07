import { FormInputLabel, Group, Input } from './form-input.styles';

import { FC, InputHTMLAttributes } from 'react';
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

export type FormInputProps = { label: string } & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel shrink={Boolean(otherProps && otherProps.value === 'string' && otherProps.value.length)}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

//shrink={Boolean(otherProps && otherProps.value === 'string' && otherProps.value.length)} // make sure that this receives a boolean, that other props exists and that is the type of string, that way we make sure that length exists

//note && -- if label exists (short circuit in JS)
//note that label className is say that is the user start typing the label will shrink

export default FormInput;
