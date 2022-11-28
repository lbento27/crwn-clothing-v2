import { createContext, useState } from 'react';

//actual value we want to access
export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser }; //this way we have access to current user and setCurrentUser

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
