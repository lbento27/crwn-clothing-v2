import { useState, useContext, FormEvent, ChangeEvent } from 'react'; // eslint-disable-line

import { useDispatch } from 'react-redux';
import { googleSignInStart, emailSignInStart } from '../../store/user/user.action';

//import { signInWithGooglePopup,signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { ButtonsContainer, SignInContainer } from './sign-in-form-styles';
import { AuthError, AuthErrorCodes } from 'firebase/auth';

const defaultFormFields = {
  email: '',
  password: '',
};

const SingInForm = () => {
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target; // get name from the inputs to distinguish each input, in the input the name most be equal to the state object name
    setFormFields({ ...formFields, [name]: value }); //spread other fields, and only update the appropriate form field
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); //stop o normal form process so we can handle it

    try {
      //await signInAuthUserWithEmailAndPassword(email, password);
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error) {
      //console.log(error);
      switch ((error as AuthError).code) {
        //case 'auth/wrong-password':
        case AuthErrorCodes.INVALID_PASSWORD:
          alert('incorrect password for email');
          break;
        //case 'auth/user-not-found':
        case AuthErrorCodes.USER_DELETED:
          alert('no user associated with this email');
          break;
        default:
          console.log(error);
      }
    }
  };

  const signInWithGoogle = async () => {
    //await signInWithGooglePopup();
    dispatch(googleSignInStart());
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email} />

        <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password} />
        <ButtonsContainer>
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
            {' '}
            Google sign in
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SingInForm;
