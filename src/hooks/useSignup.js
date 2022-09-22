import { useState } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);
    try {
      // try to signup user
      const response = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!response) {
        throw new Error('cannot create user');
      }

      //add displayName to user
      await response.user.updateProfile({ displayName });

      // dispatch LOGIN action
      dispatch({ type: 'LOGIN', payload: response.user });

      setIsPending(false);
      setError(null);
    } catch (err) {
      console.log(err);
      setError(err.message);
      setIsPending(false);
    }
  };
  return { error, isPending, signup };
};
