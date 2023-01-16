//End typescript BK
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Routes, Route } from 'react-router-dom';

//import { onAuthStateChangedListener, createUserDocumentFromAuth } from './utils/firebase/firebase.utils';
//import { getCurrentUser } from './utils/firebase/firebase.utils';
import { checkUserSession } from './store/user/user.action';

//import { setCurrentUser } from './store/user/user.action';

import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //getCurrentUser().then((user) => console.log(user));
    dispatch(checkUserSession());
  }, []); // eslint-disable-line
  //we don't need to pass where [dispatch], its only for the lint error to disappear, dispatch never change its the same as []

  //index makes the 'default' component to render with the parent in the parent path
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
