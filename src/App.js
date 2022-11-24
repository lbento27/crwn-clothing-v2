//import React from 'react';//i do this to have react snippets in vscode
import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import SignIn from './routes/sign-in/sign-in.component';

const App = () => {
  //index makes the 'default' component to render with the parent in the parent path
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
