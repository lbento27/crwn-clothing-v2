import { useState, useContext } from 'react'; // eslint-disable-line
import { useDispatch } from 'react-redux';

//import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import { signUpStart } from '../../store/user/user.action';

//import { UserContext } from '../../contexts/user.context';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { SignUpContainer } from './sign-up-form.styles';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SingUpForm = () => {
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target; // get name from the inputs to distinguish each input, in the input the name most be equal to the state object name
    setFormFields({ ...formFields, [name]: value }); //spread other fields, and only update the appropriate form field
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); //stop o normal form process so we can handle it

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      /*const response = await createAuthUserWithEmailAndPassword(email, password);
      //console.log(response);
      const { user } = response;

      await createUserDocumentFromAuth(user, { displayName });*/
      dispatch(signUpStart(email, password, displayName));
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log('user creation encounter an error', error);
      }
    }
  };

  return (
    <SignUpContainer>
      <h2>Do not have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          type='text'
          required
          onChange={handleChange}
          name='displayName'
          value={displayName}
        />

        <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email} />

        <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password} />

        <FormInput
          label='Confirm Password'
          type='password'
          required
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword}
        />
        <Button type='submit'>Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SingUpForm;
