import React, { useReducer, createContext, useEffect } from 'react';
import { auth } from '../firebase';
import * as types from './types';

const firebaseReducer = (state, action) => {
  switch (action.type) {
    case types.LOGGED_IN:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const initialState = {
  user: null
}

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(firebaseReducer, initialState);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const tokenIDResult = await user.getIdTokenResult();
        dispatch({
          type: types.LOGGED_IN,
          payload: {
            email: user.email,
            token: tokenIDResult.token
          }
        })
      } else {
        dispatch({
          type: types.LOGGED_IN,
          payload: null
        })
      }
    })
    // Clean up
    return () => unsubscribe();
  }, [])
  const value = { state, dispatch };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export {AuthContext, AuthProvider}