import { Fragment, useContext } from 'react'; // Fragment it replace a top level parent that react needs but its nos a html element
import { Outlet, Link } from 'react-router-dom'; //outlet its where we want the Route children to render

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';

import { signOutUser } from '../../utils/firebase/firebase.utils';

import './navigation.styles.scss';

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  //console.log(currentUser);

  //we need this if we only call signOutUser on the onClick our context does not know
  const signOutHandler = async () => {
    //const response = await signOutUser();
    //console.log(response);//we get undefine
    await signOutUser();
    setCurrentUser(null); //for UserContext
  };

  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <CrwnLogo className='logo' />
        </Link>
        <div className='nav-links-container'>
          {currentUser ? (
            <span className='nav-link' onClick={signOutHandler}>
              SIGN OUT
            </span>
          ) : (
            <Link className='nav-link' to='/auth'>
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
