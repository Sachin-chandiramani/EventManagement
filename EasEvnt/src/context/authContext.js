import React, {createContext, useState} from 'react';

const AuthContext = createContext();

const AuthProvider = props => {
  const [userState, setUserState] = useState(null);
  return (
    <AuthContext.Provider value={[userState, setUserState]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
